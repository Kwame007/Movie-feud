import renderMovie from "./renderMovie";
import request from "./request";

// global variable
let leftSideSearchTerm = document.getElementById("input-one");
let rightSideSearchTerm = document.getElementById("input-two");

const rightSideMovieOpponent = document.querySelector(".right-side-box");
const leftSideMovieOpponent = document.querySelector(".left-side-box");

let leftSideMovie;
let rightSideMovie;

// functions
const fetchMovieByType = async function (searchTerm, opponentSide) {
  try {
    if (!searchTerm) {
      showError("Input cannot be empty ⛔️", "negative");
    }
    // search based on input value
    const movieData = await request(searchTerm);

    // show movie details
    renderMovie(movieData, opponentSide);

    // check if {left or right side} and set {left and right} side movie value
    if (opponentSide === leftSideMovieOpponent) {
      leftSideMovie = movieData;
    } else {
      rightSideMovie = movieData;
    }

    // check if left and right movies are defined
    if (leftSideMovie && rightSideMovie) {
      calcMovieStats();
    }
    // clear input
    leftSideSearchTerm.value = rightSideSearchTerm.value = "";
  } catch (error) {
    console.log(error);
  }
};
// left side movie
const renderLeftSideMovie = function (event) {
  event.preventDefault();

  fetchMovieByType(leftSideSearchTerm.value, leftSideMovieOpponent);
};

// Right side movie
const renderRightSideMovie = function (event) {
  event.preventDefault();

  fetchMovieByType(rightSideSearchTerm.value, rightSideMovieOpponent);
};

// calc stats function
const calcMovieStats = function () {
  const leftSideStats = document.querySelectorAll(
    ".left-side-box-stats-summary .stats"
  );
  const rightSideStats = document.querySelectorAll(
    ".right-side-box-stats-summary .stats"
  );
  const leftSideRatingsStats = document.querySelectorAll(
    ".left-side-box-rating .rating-stats"
  );
  const rightSideRatingsStats = document.querySelectorAll(
    ".right-side-box-rating .rating-stats"
  );

  calcStats({ leftSideStats, rightSideStats });
  calcRatingStats({ leftSideRatingsStats, rightSideRatingsStats });
};

// {calculate Rating stats}
const calcRatingStats = function (data) {
  // loop
  data.rightSideRatingsStats.forEach((rightRating, index) => {
    let leftRating = data.leftSideRatingsStats[index];

    // dataset values
    const leftRatingValue = parseInt(leftRating.dataset.value);
    const rightRatingValue = parseInt(rightRating.dataset.value);

    console.log(leftRating, rightRating);
    if (rightRatingValue > leftRatingValue) {
      // remove positive class
      leftRating.classList.remove("is-positive");

      // add negative class
      leftRating.classList.add("is-negative");
    } else {
      // remove positive class
      rightRating.classList.remove("is-positive");

      // add negative class
      rightRating.classList.add("is-negative");
    }
  });
};

// {calculate stats}
const calcStats = function (data) {
  console.log(data);
  data.leftSideStats.forEach((leftStat, index) => {
    let rightStat = data.rightSideStats[index];

    // dataset values
    const leftStatValue = parseInt(leftStat.dataset.value);
    const rightStatValue = parseInt(rightStat.dataset.value);

    if (rightStatValue > leftStatValue) {
      // remove positive class
      leftStat.classList.remove("positive");

      // add negative class
      leftStat.classList.add("negative");

      // check if left side element contains {negative class}
      if (leftStat.classList.contains("negative")) {
        leftStat.previousElementSibling.classList.remove("teal");
        leftStat.previousElementSibling.classList.add("red");
      }
    } else {
      // remove positive class
      rightStat.classList.remove("positive");

      // add negative class
      rightStat.classList.add("negative");

      // check if left side element contains {positive class}
      if (rightStat.classList.contains("negative")) {
        rightStat.previousElementSibling.classList.remove("teal");
        rightStat.previousElementSibling.classList.add("red");
      }
    }
  });
};

// create genre label
const createGenreLabels = function (data, id) {
  let label;
  let genreLabel;

  data.split(",").map((item) => {
    // create element
    label = document.createElement("div");

    // add classlist
    label.classList.add("ui", "label");

    // add child
    label.append(item);

    // select parend node
    genreLabel = document.getElementById(`${id}`);

    // append label as child node
    genreLabel.appendChild(label);
  });
  return;
};
const createActorLabels = function (data, id) {
  let label;
  let genreLabel;

  data.split(",").map((item) => {
    // create element
    label = document.createElement("div");

    // add classlist
    label.classList.add("ui", "right", "pointing", "red", "basic", "label");

    // add child
    label.append(item);

    // select parend node
    genreLabel = document.getElementById(`${id}`);

    // append label as child node
    genreLabel.appendChild(label);
  });
  return;
};

// {show error function}
const showError = function (message, className) {
  // create div element
  const messageDiv = document.createElement("div");
  const icon = document.createElement("i");

  // add class
  messageDiv.classList.add("ui", "message", `${className}`);
  // add text content
  messageDiv.textContent = message;
  // add icon class
  icon.classList.add("icon", "close");

  // append icon to div
  messageDiv.appendChild(icon);

  // sibling
  const sibling = document.querySelector(".main");

  // insert
  sibling.insertAdjacentElement("beforebegin", messageDiv);

  // remove error after 3s
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
};

export {
  calcMovieStats,
  createGenreLabels,
  createActorLabels,
  fetchMovieByType,
  renderLeftSideMovie,
  renderRightSideMovie,
};
