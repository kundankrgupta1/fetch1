let allMoviesPlaceElement = document.getElementById("allMoviesPlace");

let trednMoviesElement = document.getElementById("trednMovies");


let URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`;


let IMGPATH = `https://image.tmdb.org/t/p/w1280`;

let SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`;


async function getData(API_URL) {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
    }
}

function displayMovie(moviesList) {
    moviesList.forEach((movies) => {
        // allMoviesPlaceElement.innerHTML = "";

        let moviesCard = document.createElement("div");

        let trednMoviesCard = document.createElement("div");
        trednMoviesCard.style.display = "flex";
        trednMoviesCard.style.gap = "10px";
        trednMoviesCard.style.alignItems = "center";


        let moviesImgElement = document.createElement('img');
        moviesImgElement.src = `${IMGPATH+movies.poster_path}`;
        moviesImgElement.style.width = "290px";


        let trednMoviesImgELement = document.createElement("img");
        trednMoviesImgELement.src = `${IMGPATH+movies.poster_path}`;
        trednMoviesImgELement.style.height = "35px"
        trednMoviesImgELement.style.width = "35px"

        let trednMoviesTitleElement = document.createElement("p");
        trednMoviesTitleElement.textContent = movies.title;
        trednMoviesTitleElement.className = "trednMoviesTitleElement";

        trednMoviesCard.append(trednMoviesImgELement, trednMoviesTitleElement);
        trednMoviesElement.append(trednMoviesCard);
        

        moviesCard.append(moviesImgElement);

        allMoviesPlaceElement.append(moviesCard);
    })
}

function displayError(){
    allMoviesPlaceElement.innerHTML = "";
    allMoviesPlaceElement.textContent = "Something went wrong...";

    trednMoviesElement.innerHTML = "";
    trednMoviesElement.textContent = "something went wrong...";
}


async function init() {
    try {
        let moviesData = await getData(URL);
        displayMovie(moviesData);
    } catch (error) {
        displayError();
    }
}
init();



let input = document.getElementById("input");

let submitBtn = document.getElementById("submit");

submitBtn.addEventListener("keyup", function (event) {
    if (event.target.value != "") {
        getData(SEARCHAPI + event.target.value)
    } else {
        init();
    }
})



/*
async function  getData(mN){

    let res = await fetch(`https://www.omdbapi.com/?apikey=f9b09b4e&t=${mN}`);
    let data = await res.json();
    showData(data);
}


document.getElementById("submit").addEventListener("click",()=>{

    let movieName = document.getElementById("input").value;
    getData(movieName);
})

*/