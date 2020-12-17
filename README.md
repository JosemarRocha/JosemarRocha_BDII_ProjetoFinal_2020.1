# Projeto Final de Banco de Dados 2
## Projeto acanimes

###### Como instalar:

Requerimentos:
- Node js.
- MongoDB.
- Neo4j. Desktop(Windows) ou Enterprise(Linux ou outro SO).

1. Faça o download do repositório como .zip

2. Extraia o arquivo .zip em um diretório de fácil manuseio. Devem haver 3 pastas, web e backend do 1 ao 3.

3. Com o terminal, navegue até cada uma das pastas extraidas, web, backend1-3, e utilize o seguinte comando em cada uma delas:
```
yarn install
```

4. Em caso de erro quanto ao uso do Express, é recomendo usar o comando abaixo para a instalação do mesmo no projeto:
```
npm install
```

5. Após a instalação de todas as dependências, devemos então ativar o MongoDB com os seguintes comandos na pasta BIN:
```
mongod --dbpath <diretório de instalação do mongo>
mongo
```

Cada comando com seu próprio terminal.

6. Em seguido iremos criar o banco de dados no neo4j, ele deve ter o nome "bd" e a senha fica a seu critério, a minha era joshua, em referência a este brilhante homem.
  - Se quiser mudar, ela deverá ser mudada no código também.
    - Ao criar o banco de dados do neo4j é necessário que veja a Bolt Port do mesmo, exemplo 7687.
7. Quando conseguir encontrar a Bolt Port do Neo4j, deverá ir no diretório do backend2 e no arquivo "routes.js" modificar a linha de código número 6:
```
const driver = new neo4j.driver("neo4j://localhost:<BOLT PORT DO NEO4J>", neo4j.auth.basic("neo4j", "<SENHA ESCOLHIDA>")); //("usuario", "senha")
```

8. Com tudo feito, podemos iniciar o banco do neo4j.

9. Com o seguinte comando iniciaremos os 3 bancos de dados nos terminais, é necessário um terminal para cada banco onde irá navegar até cada diretório, exemplo backend1-3:
```
yarn dev
```

10. Agora devemos iniciar a parte web, navendo até seu diretório de nome "web" e utilizando o seguinte comando:
```
npm start
```

11. Por fim para acessarmos o ambiente/site, no navegador acessamos o seguinte link:
```
http://localhost:3000/
```
      
###### Exemplo de Teste do ambiente:

1. Cadastre um usuário, exemplo, Usuario: acauan, Senha: acauan, apertando o botão "registrar" e em seguida acesse fazendo login.
2. Com este usuário, navegue até a página de curtir animes pelo meno.
  - Aqui insira os dados e confirme o like.
    - Repita o processo outra vez curtindo outro anime.
3. Você neste ponto pode ver os animes que curtiu na página "Animes Curtidos".
4. Volte à tela de login e crie um novo usuário, em seguida faça login com o mesmo.
  - Curta um anime que o usuário anterior já tem como curtido, fazendo o mesmo processo na página de "Curtir Animes".
5. Por fim vá até a página "Receber recomendações" e o que deve aparecer é o anime que o outro usuário curtiu, mas este novo não.

###### Agradecimentos:

- Professor Acauan.
- Joshua Kook Ho.
- Tarlison Brito.
- Miller Monteiro.
- Markus Kaul.
- Luigi Muller.
- Matheus Fellype.
- André Leandro Schillreff.
      
