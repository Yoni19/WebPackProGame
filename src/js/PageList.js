import {limitOfShow,limitPerPage,apiUrl,contentZone,newRelease,thisWeekArgument,orderByDate,orderByRating} from "./index";
import{cardShow}from "./gameInfo";
import{pushNewContent,observerAnimation,backToTop} from "./animation";
import{existOrNot} from "./helpers";
import{Filter} from "./filtration";

const PageList = (argument = "") => {
  const welcome = `<div id="welcome_section" class="mx-0 my-3 p-0"><h1 id="welcome_title" class="white_title">Bienvenue !</h1><p class="welcome_text">
  Bienvenue au plus gros evenement mondial consacré au jeux video ! ProGame c'est l'evenement à ne pas raté pour tout savoir sur les dernieres pépites audiovisuels.
  Echange avec des passionnés sur les derniers jeux !
  </p></div>`;
 
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (argument) => {
      let finalURL = "";
      if (!existOrNot(argument)) {
        finalURL =
          apiUrl +
          "?" +
          newRelease +
          "&" +
          orderByDate +
          "&" +
          limitOfShow;
      } else if (argument === "this-week") {
        finalURL =
          apiUrl +
          "?" +
          thisWeekArgument +
          "&" +
          orderByDate +
          "&" +
          limitOfShow;
      } else if (argument === "all-time-best") {
        finalURL = apiUrl + "?" + orderByRating + "&" + limitOfShow;
      } else {
        finalURL =
          apiUrl + "?" + argument + "&" + orderByDate + "&" + limitOfShow;
      }
      fetch(finalURL)
        .then((response) => response.json())
        .then((response) => {
          let result = response.results;
          let i = 0;

          const justNine = (i, result) => {
            let page = result.slice(i, i + limitPerPage);
            let innerHTML = "";
            page.forEach((article) => {
              innerHTML += cardShow(article);
            });
            return innerHTML;
          };
          

          document.querySelector(".page-list .articles").innerHTML = `
            ${welcome}
            <div class="row stick_bottom justify-content-center">
              <select id="platform_filter" class="btn btn_input my-4">
              </select>
            </div>
            <div id="game_gallery" class="row justify-content-center">
              ${justNine(0, result)}
            </div>
            <div class="row justify-content-center">
              <button id="see_more" class="btn btn_input">Voir plus</button>
            </div>
          `;
          backToTop();

          const seeMore = document.getElementById("see_more");
          const showMore = () => {
            i += limitPerPage;
            document.getElementById("game_gallery").innerHTML += justNine(
              i,
              result
            );
            pushNewContent();
            if (i >= limitPerPage * 2) {
              seeMore.classList.add("d-none");
            }
          };
          seeMore.addEventListener("click", showMore);
        })
        .then(() => {
          Filter(thisWeekArgument, orderByRating);
        })
        .then(() => {
          const observables = ".game_card";
          observerAnimation(observables);
        })
       
    };

    fetchList(cleanedArgument);
  };

  const render = () => {
    contentZone.innerHTML = `
      <section class="page-list">
        <div class="articles">Patience ton bonheur est en chemin ...</div>
      </section>
    `;

    preparePage();
  };

  render();
};

  export {PageList}; 