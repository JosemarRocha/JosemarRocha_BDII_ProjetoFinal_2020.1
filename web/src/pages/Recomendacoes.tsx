import { useHistory } from "react-router-dom";
import neoApi from "../services/neoApi";
import "../styles/pages/recomendacoes.css";
import {useEffect, useState} from 'react';

import bckgImg from "../images/Zoom_Chibi_Hime_bubbles_4028f4eb-1fac-45b6-bdb2-44653565af08.png"


export default function Recomendations(){
  const history = useHistory();

  const [films, setFilms] = useState([]);
  const username = history.location.state;

  async function dale(){
    //recupera os animes recomendados
    const recomendation = await neoApi.get(`/neo4j/${username}`);
    
    const teste = recomendation.data.filmes;

    if (teste[0] != null){
      console.log("tem", teste);
      setFilms(teste);
    }else{
      console.log("nao tem", teste);
      const planob = await neoApi.get("/neo4j/recomendados");
      setFilms(planob.data.filmes);
    }
    
  }

  useEffect(() =>{
    dale()
  }, [])

  console.log(username);

  return(
    <div id="recomendation">
        <h1>Recomendações</h1>
      <div className="rec-menu">

        <ul>{films.map((film) => <li>{film}</li>)}</ul>

      </div>

    </div>
  )
}