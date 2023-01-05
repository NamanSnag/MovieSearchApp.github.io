// Search API Link: http://www.omdbapi.com/?s=${movie name}&apikey=f1c62b9b
// Details API Link: http://www.omdbapi.com/?i=${movie id}&apikey=f1c62b9b
// key : f1c62b9b

const search_Template = document.querySelector('[data-search-template]');
const search_Input = document.querySelector('[data-search]');
const container = document.querySelector('[data-search-container]');
const searchList = document.getElementsByClassName('search-list');
const fav_movies = document.querySelector('[data-fav-movies]');
const fav_btn = document.querySelector('[data-btn]');
const fav_Container = document.querySelector('[data-fav-container]');
const favcard_Template = document.querySelector('[data-card-template]');
const detail_Template = document.querySelector('[data-main-template]');
const detail_card = document.querySelector('[data-details]');
const none = document.getElementsByClassName('search-card');
const cour = document.getElementById('carouselExampleIndicators');

//   containers
const main = document.getElementById('main');
// favourite movies data
let favMovies = [];

// search for movies
search_Input.addEventListener('input', (event) => {
    event.preventDefault();
    none[0].style.visibility = 'visible';
    cour.style.visibility = 'visible';
    cour.style.height = '480px';
    none[0].style.height = '250px';
    const key = event.target.value;
    container.innerHTML = '';
    // fetching the search api
    fetch(`http://www.omdbapi.com/?s=${key}&apikey=f1c62b9b`)
    .then(res => res.json())
    .then((data) => {
        if(data.Search != undefined) {
            data.Search.forEach(element => {
                // this will give document card fragment
                const movies = search_Template.content.cloneNode(true).children[0];
                const title = movies.querySelector('[data-title]');
                const year = movies.querySelector('[data-year]');
                const image = movies.querySelector('[data-image]');
                const id = movies.querySelector('[data-fav]');
                const heart = movies.querySelector('[data-heart]');
                const details = movies.querySelector('[data-detail-card]');
                let favboolean = false;
                let storageArray = JSON.parse(getFromLocalStorage());
                if(storageArray != null) {
                    favMovies = storageArray;
                }
                title.innerHTML = element.Title;
                year.innerHTML = element.Year;
                image.src = element.Poster;
                id.setAttribute('id',element.imdbID);
                details.setAttribute('class',element.imdbID);
                id.addEventListener('click', () =>{
                    if(!favboolean){
                        favboolean = true;
                        favMovies.push(element.imdbID);
                        heart.style.backgroundColor = 'yellow';
                        setToLocalStorage(favMovies);
                    }else{
                        favboolean = false;
                        favMovies.splice(favMovies.indexOf((element.imdbID, 1)));
                        heart.style.backgroundColor = 'white';
                        setToLocalStorage(favMovies);
                    }
                })
                details.addEventListener('click', () =>{
                    main.style.display = 'none';
                    let value = element.imdbID;
                    fetch(`http://www.omdbapi.com/?i=${value}&apikey=f1c62b9b`)
                    .then((response) => response.json())
                    .then((data) =>{
                        const movies = detail_Template.content.cloneNode(true).children[0];
                        const poster = movies.querySelector('[data-details-img]');
                        const title = movies.querySelector('[data-details-head]');
                        const release = movies.querySelector('[data-details-year]');
                        const runtime = movies.querySelector('[data-details-run]');
                        const summary = movies.querySelector('[data-detais-summary]');
                        const rating = movies.querySelector('[data-detais-rateing]');
                        const actors = movies.querySelector('[data-details-Actors]');
                        console.log(data);
                        poster.src = data.Poster;
                        title.innerHTML = data.Title;
                        release.innerHTML = 'Released : '+ data.Released;
                        runtime.innerHTML = 'Runtime : '+ data.Runtime;
                        rating.innerHTML = data.imdbRating + ' ⭐';
                        summary.innerHTML = data.Plot;
                        actors.innerHTML = 'Actors : ' + data.Actors;
                        detail_card.append(movies);

                    })
                });
                container.prepend(movies);
            }); 
        }
    });
});

// Faviourite card
fav_btn.addEventListener('click', function run (event) {
    // event.preventDefault();
    none[0].style.visibility = 'hidden';
    cour.style.visibility = 'hidden';
    cour.style.height = '100px';
    none[0].style.height = '20px';
    let localArray = JSON.parse(getFromLocalStorage());
    if(localArray == null) {
        return;
    }
    favMovies = localArray;
    fav_Container.innerHTML = '';
    favMovies.forEach(function(val){
        fetch(`http://www.omdbapi.com/?i=${val}&apikey=f1c62b9b`)
        .then((response) => response.json())
        .then((data) =>{
            const movies = favcard_Template.content.cloneNode(true).children[0];
            const poster = movies.querySelector('[data-card-poster]');
            const title = movies.querySelector('[data-card-title]');
            const release = movies.querySelector('[data-card-release]');
            const runtime = movies.querySelector('[data-card-run]');
            const addId = movies.querySelector('[data-remove]');
            poster.src = data.Poster;
            title.innerHTML = data.Title;
            release.innerHTML = 'Released :'+ data.Released;
            runtime.innerHTML = 'Runtime :'+ data.Runtime;
            addId.setAttribute('id', val);
            fav_Container.append(movies);
            addId.addEventListener('click', () =>{
                favMovies.splice(favMovies.indexOf(val, 1), 1); 
                setToLocalStorage(favMovies);
                fav_Container.innerHTML = '';
                run();
            })
        });
    });
});

// local storage
// set to local storage
const setToLocalStorage = (fav_movies) =>{
    localStorage.setItem('fav', JSON.stringify(fav_movies));

}

// get data from local storage
const getFromLocalStorage = () =>{
    const data = localStorage.getItem('fav');
    return data;
}
