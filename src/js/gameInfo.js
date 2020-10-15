import{DateFormat,noImage,existOrNot,releaseOrNot} from "./helpers";
import{limitOfShow,apiUrl,showBase,imageEmpty} from "./index";

const ratingInfo = (game) => {
    if (!existOrNot(game.rating)) {
      return "Il n'y a pas encore de d'évaluation";
    }
    let counts = game.ratings.map((element) => element.count);
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let votes = counts.reduce(reducer);
    return ` evaluation : ${game.rating}/5 - Pour ${votes} votes`;
  };
  
const showSameCategory = (category, categoryName) => {
    if (!existOrNot(category)) {
      return "N'a pas encore été ajouté";
    }
    let text = "";
    category.slice(0, limitOfShow).forEach((element) => {
      text += `
      <a href="#games/${categoryName}=${element.slug}" class="internal">
        ${element.name}
      </a> `;
    });
    return text;
  };
  
 const showPlatforms = (platforms) => {
    if (platforms == undefined || platforms == "" || platforms == "null") {
      return "";
    }
    let platformInnerHTML = "";
    platforms.forEach((element) => {
      platformInnerHTML += `
      <a href="#games/platforms=${element.platform.id}" class="internal">
        ${element.platform.name}
      </a> `;
    });
    return platformInnerHTML;
  };
  
const showPurchase = (stores) => {
    if (!existOrNot(stores)) {
      return "";
    }
    let innerHTML = "";
    stores.forEach((store) => {
      innerHTML += `<a href="${store.url}" target="_blank" title="go to ${store.store.name}" class="external white">${store.store.name}</a>, `;
    });
    return `
      <div id="purchase_zone" class="row game_attribute stick">
        <div class="col stick col-12">
          <h3>BUY</h3>
        </div>
        <div id="stores" class="col stick col-12">
          <p>${innerHTML}</p>
        </div>
      </div>`;
  };
  
const fetchImages = (gameSlug, gameName) => {
    fetch(`https://api.rawg.io/api/games/${gameSlug}/screenshots${showBase}`)
      .then((response) => response.json())
      .then((response) => {
        let screenshotZone = document.getElementById("screenshots");
        let images = response.results;
        if (existOrNot(images)) {
          images.forEach((img) => {
            screenshotZone.innerHTML += `
              <div class="flex_col_2 stick pr-1">
                <img class="screenshots" src=${noImage(
                  img.image,
                  imageEmpty
                )} alt="a screen shot of ${gameName}"/>
              </div>`;
          });
        } else {
          document.getElementById("screenshots").classList.add("d-none");
        }
      })
      
  };
  
const fetchYoutube = (gameSlug) => {
    fetch(`${apiUrl}/${gameSlug}/youtube${showBase}`)
      .then((response) => response.json())
      .then((response) => {
        let videos = response.results;
        let youtubeZone = document.getElementById("youtube");
        if (!existOrNot(videos)) {
          youtubeZone.classList.add("d-none");
        }
        videos.forEach((video) => {
          youtubeZone.innerHTML += `
              <div class="flex_col_2 stick iframe_container pr-1">
                <iframe width="640" height="360" class="stick youtube w-100" 
                   src="https://www.youtube.com/embed/${video.external_id}">
                </iframe>
                <p class="white_title">${video.name}</p>
                <p>${video.channel_title} | ${DateFormat(
            video.created
          )}</p>
              </div>`;
        });
      })
      
  };
  
const fetchSimilar = (gameId) => {
    fetch(`${apiUrl}/${gameId}/suggested${showBase}`)
      .then((response) => response.json())
      .then((response) => {
        let games = response.results;
        let similarGameZone = document.getElementById("similar");
  
        if (existOrNot(games)) {
          games.forEach((game) => {
            similarGameZone.innerHTML += cardShow(game);
          });
        } else {
            similarGameZone.classList.add("d-none");
        }
      });
  };
  
/*---------------------------------------------------------------------------------------------------------

const platformLogo = (platformName) => {
  
        switch(platformName) {
          case "PC":
            return `<img src="images/windows.svg"></img>`;
            break;
          case "PlayStation":
          case "PlayStation 2":
          case "PlayStation 3":
          case "PlayStation 4":
          case "PlayStation 5":
            return `<img src="images/ps4.svg"></img>`;
            break;
          case "Xbox":
          case "Xbox 360":
          case "Xbox One":
          case "Xbox Series S/X":
            return `<img src="images/xbox.svg"></img>`;
            break;
          case "iOS":
            return `<img src="images/mobile.svg"></img>`;
            break;
          case "Android":
            return `<img src="images/android.svg"></img>`;
            break;
        }
      }
14 h 50



--------------------------------------------------------------------------------------------------------------*/
  const cardShow = (game) => {
    let text = `<a href="#game/${game.slug || game.id}"><div id="${
      game.slug || game.id
    }" class="card game_card">
          <img class="card-img-top card_head" src="${noImage(
            game.background_image,
            imageEmpty
          )}" alt="cover_image_${game.slug}">
          
          <div class="card-img-top card-tail white_title p-5">
            <p class="text">${releaseOrNot(game.released)}:${
      game.released
    }</p>
            <p class="text">${ratingInfo(game)}</p>
            <p class="text">Genres: ${showSameCategory(game.genres, "genre")}</p>
          </div></a>
          <div class="card-body">
            <h5 class="card-title m-0 p-0 white_title">${game.name}</h5>
            <p class="platform_info card-text">${showPlatforms(
              game.platforms
            )}</p>
          </div>
        </div>`;
    return text;
  };

  export{ratingInfo,showSameCategory,showPlatforms,showPurchase,fetchImages,fetchYoutube,fetchSimilar,cardShow};