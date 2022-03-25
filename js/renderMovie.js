import { createActorLabels, createGenreLabels } from "./helperFunctions";

// {render movie data for various sides}
const renderMovie = function (data, element) {
  try {
    // {movie stats value}
    let dollarValue;

    const metaScore = parseInt(data.Metascore);
    const imdbRating = parseFloat(data.imdbRating);
    const imdbVotes = parseInt(data.imdbVotes.replaceAll(",", ""));

    const awards = data.Awards.split(" ").reduce((prev, word) => {
      const value = parseInt(word);

      if (data?.BoxOffice) {
        dollarValue = parseInt(
          data.BoxOffice.replaceAll("$", "").replaceAll(",", "")
        );
      }

      // {check if NAN}
      if (isNaN(value)) {
        return prev;
      } else {
        return (prev += value);
      }
    }, 0);

    const html = `
          <div class="ui grid" style="margin-top: 1rem">
                <div class="six wide column">
                  <img src=${data.Poster} style="width :100%;display:block;">
                </div>
                <div class="ten wide column">
                  <div class ="info">
                    <h3>${data.Title}</h3>
                    <div id="${element.className}" style="margin:0 0 .5rem 0"></div>
                    <p class="plot">${data.Plot}</p>
                  </div>
                </div>
                </div>
                <br>
                <div class="another">
                  <a class="ui blue  label">Rated : ${data.Rated}</a>
                  <a class="ui teal  label">Year : ${data.Year}  </a>
                  <a class="ui pink  label"> Running : ${data.Runtime}</a>
                  <a class="ui yellow  label">Released : ${data.Released}  </a>
                </div>
                <br>
                <div class="ui equal width grid">
                  <div class="column"></div>
                  <div class="column"> <a class="ui pointing basic label" style="width:100%;text-align:center">info ℹ️</a></div>
                  <div class="column"></div>
                </div>
                <div class="${element.className}-stats-summary">
                  <div class="ui sixteen wide column " style="position:relative">
                    <div class="floating ui teal label">Awards 🏅</div>
                    <div data-value=${awards} class="ui positive message stats">
                      <p>${data.Awards}</p>
                    </div>
                  </div>
                  <br>
                  <div class="ui sixteen wide column " style="position:relative">
                    <div class="floating ui teal label">Box Office 🍿</div>
                    <div data-value=${dollarValue} class="ui positive message stats">
                      <p>${data.BoxOffice}</p>
                    </div>
                  </div>
                    <br>
                  <div class="ui sixteen wide column ${element.className}-rating" style="position:relative;text-align:center">
                    <div class="ui equal width grid">
                      <div class="column">
                        <div data-value=${metaScore} class="ui card rating-stats is-positive">
                          <div class="content">
                            <div class="header">${data.Metascore}</div>
                          </div>
                          <div class="extra content">
                            <button class="ui button">Metascore</button>
                          </div>
                        </div>
                      </div>
                      <div class="column">
                        <div data-value=${imdbRating} class="ui card rating-stats is-positive">
                          <div class="content">
                            <div class="header">${data.imdbRating}</div>
                          </div>
                          <div class="extra content">
                            <button class="ui button">IMDB</button>
                          </div>
                        </div>
                      </div>
                      <div class="column">
                        <div data-value=${imdbVotes} class="ui card rating-stats is-positive">
                          <div class="content">
                            <div class="header">${data.imdbVotes}</div>
                          </div>
                          <div class="extra content">
                            <button class="ui button">Votes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          
                <div class="ui equal width grid">
                  <div class="column"></div>
                  <div class="column"> <a class="ui pointing basic label" style="width:100%;text-align:center">Stats 😬</a></div>
                  <div class="column"></div>
                </div>

                <br>

                <div class="ui sixteen wide column">
                  <div id="${element.className}-actors" style="margin:0 0 .5rem 0"><span class="ui label">Starring 🎬 :</span> </div>
                </div>
                  <br>
                <div class="ui sixteen wide column " style="position:relative;text-align:center">
                 <div class="ui grid">
                    <div class="eight wide column">
                      <div class="ui info message">
                        <h5>${data.Director}</h5>
                        <div class="ui tiny teal label">
                              Director
                        </div>
                      </div>
                    </div>
                    <div class="eight wide column">
                      <div class="ui info message">
                        <h5>${data.Writer}</h5>
                        <div class="ui tiny teal label">
                            Writer
                        </div>
                      </div>
                    </div>
                    <div class="eight wide column">
                      <div class="ui info message">
                      <h5>${data.Type}</h5>
                      <div class="ui tiny teal label">
                            Type
                        </div>
                      </div>
                    </div>
                    <div class="eight wide column">
                    <div class="ui info message">
                    <h5>${data.Country}</h5>
                    <div class="ui tiny teal label">
                            Country
                        </div>
                    </div>
                    </div>
                </div>
              </div>

              <div class="ui equal width grid">
                <div class="column"></div>
                <div class="column"> <a class="ui pointing basic label" style="width:100%;text-align:center">Other 🤔</a></div>
                <div class="column"></div>
              </div>
          </div>
  `;
    element.innerHTML = html;

    // create genre labels
    createGenreLabels(data.Genre, `${element.className}`);

    // create actor labels
    createActorLabels(data.Actors, `${element.className}-actors`);
  } catch (error) {
    console.log(error.message);
  }
};

export default renderMovie;
