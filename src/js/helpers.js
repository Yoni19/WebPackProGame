import{time} from "./index";

let moment = require("moment");

const DateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

const noImage = (image, imageEmpty) => {
  if (image === null) {
    return imageEmpty;
  } else {
    return image;
  }
};

const existOrNot = (x) => {
  return !(
    x == 0 ||
    x === [] ||
    x === null ||
    x === undefined ||
    x === 0
  );
};
const releaseOrNot = (date) => {
  if (time > date) {
    return "Sorti le ";
  } else {
    return "Sortira le ";
  }
};

export{DateFormat,noImage,existOrNot,releaseOrNot};