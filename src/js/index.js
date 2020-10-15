import "../styles/style.scss";
import "bootstrap";
import{routes} from "./routes";
import { DateFormat } from "./helpers";
import{submitSearch} from "./search";
import{Home} from "./Home";
import { weekOrAll } from "./selection";
import "./cursor";


let moment = require("moment");


let pageArgument;

// import all element usefull for afterwards
const contentZone = document.getElementById("pageContent");
const platformUrl = `https://api.rawg.io/api/platforms?ordering=-games_count&page=1&page_size=${platformLimit}`;
const limitOfShow = 4;
const limitTotalPerPage = 27;
const former = document.getElementById('Former');
const searchForm = document.getElementById('goSearch').value;
console.log("searchform: ",searchForm);
const searchInput = document.getElementById('searching');
console.log("searchinput :",searchInput.value);
const now = new Date();
const home = document.getElementById("pgtitle");
const time = DateFormat(now);
const timeWeek = DateFormat(moment(now).add(7, "days"));
const timeTo = DateFormat(moment(now).add(1, "year"));
const newRelease = `dates=${time},${timeTo}`;
const thisWeekArgument = `dates=${time},${timeWeek}`;
const orderByDate = "ordering=-released";
const orderByRating = "ordering=-rating";
const platformLimit = 7;
const limitPerPage = 9;
const apiUrl = `https://api.rawg.io/api/games`;
const showBase = `?page=1&page_size=${limitOfShow}`;
const specialChars = /[^,a-zA-Z0-9\-]/g;
const imageEmpty = "src/images/no_image.jpg";

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  let pageArgument = path[1] || "";
  routes[path[0]](pageArgument);
  return true;
};

former.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(searchInput);
  submitSearch(searchInput);
});

weekOrAll(thisWeekArgument, orderByRating);

home.addEventListener("click" , ()=> Home());



window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
document.getElementById("page_title").addEventListener("click", () => {
  window.location = "index.html";
});




export{platformUrl,limitOfShow,limitTotalPerPage,platformLimit,limitPerPage,apiUrl,showBase,specialChars,imageEmpty,time,timeTo,newRelease,thisWeekArgument,orderByDate,orderByRating,contentZone};