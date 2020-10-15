import {specialChars} from "./index";

const submitSearch = (searchInput) => {
  let keywords = searchInput.value;
  console.log("ok :",keywords)
    keywords.toLowerCase();
    keywords.replace(specialChars, ""),
    keywords.replace(/\s/, "-");
  window.location.href = `#games/search=${keywords}`;

};

export{submitSearch};