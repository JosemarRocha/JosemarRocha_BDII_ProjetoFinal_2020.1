import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import "../styles/pages/curtir.css";

import Sidebar from "../components/Sidebar";
import neoApi from "../services/neoApi";
import mongoApi from "../services/mongoApi";

import backgrImg from "../images/crunchyroll-hime_by6h.jpg"

export default function Curtir() {
  const history = useHistory();

  const username = history.location.state;

  console.log(username);

  const [film, setFilm] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [director, setDirector] = useState("");


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {"film":film};
    const relatData = {"name":username, "film":film};

    const validate = await neoApi.get(`/neo4j/${film}/verifica`);
    const verdade = validate.data.filmes;

    const mongoData = {
      "name":film,
      "year":year,
      "gender":gender,
      "director":director
    };

    console.log(verdade);

    if (verdade[0] != null){

      const relat = await neoApi.post("/neo4j/",relatData);
      console.log("teste",relat);

    }else{
      const mongoteste = await mongoApi.post("/mongo/create", mongoData);
      const teste = await neoApi.post("/neo4j/create_film/", data);
      const relat = await neoApi.post("/neo4j/",relatData);

      console.log("teste2", teste, relat);
      console.log(mongoteste);
    }
    //const teste = await neoApi.post("/neo4j/create_film/", data);
    //const relat = await neoApi.post("/neo4j/",relatData);

    //console.log(teste);
    //console.log(relat);


    alert("Cadastro realizado com sucesso!");

    history.push({pathname: "/menu", state:username});
  };

  return (
    <div id="page-create-orphanage">
      

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">

          <fieldset>
            <legend>Informe seu anime</legend>
            <div className="input-block">
              <label htmlFor="film">Nome do anime</label>
              <input
                id="film"
                value={film}
                required
                onChange={(e) => setFilm(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="gender">Gênero do anime</label>
              <input
                id="gender"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="year">Ano do anime</label>
              <input
                id="year"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="director">Diretor do anime</label>
              <input
                id="director"
                value={director}
                required
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>

          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>

        </form>
      </main>
    </div>
  );
}
