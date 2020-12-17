const express = require('express');
const router = express.Router();

//Configuração neo4j -- https://adamcowley.co.uk/javascript/using-the-neo4j-driver-with-nodejs/
const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "joshua")); //("usuario", "senha")


//animes + assistidos, usuario novo sem curtidas
router.get('/neo4j/recomendados', async function(req, res, next){

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })


    const node_res = await session.run(
        `MATCH (:Person)-[l:LIKED]->(m:Movie)
        WITH m, count(l) as quant_atores
        RETURN m.title, quant_atores
        ORDER BY quant_atores DESC
        LIMIT 3`
    , {});
    session.close();
    
    console.log({filmes: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

}); 

 //filmes + assistidos, usuario ja existente e ja curtiu um anime
router.get('/neo4j/:name', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })

    console.log(req.params.name);

    const node_res = await session.run(
        `MATCH
        (p:Person)-[:LIKED]->(m:Movie)<-[:LIKED]-(p2:Person)-[:LIKED]->(m2:Movie)
        WHERE p.name = "${req.params.name}"
        WITH m2
        WHERE NOT (p)-[:LIKED]->(m2)
        RETURN m2.title, COUNT(m2) as m2_t
        ORDER BY m2_t DESC LIMIT 3`
    , {});
    session.close();
    
    console.log({filmes: node_res["records"].map((name)=>{
        
        return name["_fields"][0]
    })});

    res.send({filmes: node_res["records"].map((name)=>{

        return name["_fields"][0]
    })});

});

//CRIAR NODO PESSOA
router.post('/neo4j/create/', async function(req, res, next){

    let {name} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (n:Person {name:"${name}"}) return n`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//CRIAR NODO FILME ANIME
router.post('/neo4j/create_film/', async function(req, res, next){

    let {film} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (m:Movie {title:"${film}"}) return m`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

// CRIAR RELACAO PESSOA -- GOSTA -- ANIME
router.post('/neo4j/', async function(req, res, next){

    let {name, film} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `MATCH (a: Person), (b:Movie)
        WHERE a.name = '${name}' AND b.title = '${film}'
        CREATE (a)-[r:LIKED]->(b)
        RETURN a.name, b.title`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//DELETA RELACAO PESSOA -- GOSTA -- ANIME
router.delete('/neo4j', async function(req, res, next){

    let {name, film} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });
    const node_res = await session.run(
        `MATCH (a: Person)-[r:LIKED]->(b:Movie)
        WHERE a.name = '${name}' AND b.title = '${film}'
        DELETE r
        RETURN a.name, b.title`, {});
    session.close();
    
    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
});

//checa se o nodo com o anime ja existe
router.get('/neo4j/:name/verifica', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (m:Movie {title: "${req.params.name}"}) RETURN m.title`
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});

//devolve os animes que a pessoa curtiu
router.get('/neo4j/:name/filmes', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (p:Person {name: "${req.params.name}"})-[:LIKED]->(m:Movie) RETURN m.title` 
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({filmes: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});
module.exports = router;