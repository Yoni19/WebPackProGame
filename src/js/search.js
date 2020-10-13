import {specialChars} from "./index";

const submitSearch = (searchInput) => {
  let keywords = searchInput.value
    .toLowerCase()
    .replace(specialChars, "")
    .replace(/\s/, "-");
  window.location.href = `#games/search=${keywords}`;

};

export{submitSearch};