import { render } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import "../styles/pages/menu.css";

import neoApi from "../services/neoApi";

import backgImg from"../images/Zoom_Jumping-Hime_1.png";

export default function Menu(){
  const history = useHistory();

  const teste = history.location;
  const username = teste.state;
  console.log(username);

  function goToLikear(){
    history.push({pathname:"/curtir", state:username})
  }

  function goToRecomendation(){
    history.push({pathname:"/recomendacoes", state:username})
  }

  function goToList(){
    history.push({pathname:"/animelist", state:username})
  }

  return(
    <div id="dashboard">
      <div className="dashboard-menu">

        <main>

          <div>
            <button 
              className="registerBtn" 
              onClick={goToLikear}>
              <span className="laike">Curtir animes</span>
            </button>
          </div>

          <div>
            <button 
              className="recomendationBtn" 
              onClick={goToRecomendation}>
              <span className="gimme">Receber recomendações</span>
            </button>
          </div>

          <div>
            <button 
              className="moviesBtn" 
              onClick={goToList}>
              <span className="movies">Animes Curtidos</span>
            </button>
          </div>
          
        </main>

      </div>
    </div>
  )
}