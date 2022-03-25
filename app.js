import { renderLeftSideMovie, renderRightSideMovie } from "./js/helperFunctions";

// {commonjs import}
// const { request } = require("./request");

// global variable
const leftSideForm = document.querySelector(".input-one");
const rightSideForm = document.querySelector(".input-two");

// events handlers
leftSideForm.addEventListener("submit", renderLeftSideMovie);
rightSideForm.addEventListener("submit", renderRightSideMovie);

// {es6 named export}
