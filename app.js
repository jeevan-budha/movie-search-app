const searchFrom =document.querySelector("form");
const movieContainer =document.querySelector(".movie-container");
const moviePoster =document.querySelector(".movie-poster");
const movieDetails = document.querySelector(".movie-details");
const inputBox = document.querySelector(".inputBox");



async function getmovieInfo(movie){
    try{
        const myApiKey ='79629e54';
        const url =`http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
    
        const response =await fetch(url);
        if(!response.ok){
            throw new Error("unable to fetch movie data.");
        }
        const data =await response.json();
        showMovieData(data);

    }catch(error){
        showErrorMessage("Oops No Movie Found try another movie!!!!");
    }
   
}

const showMovieData =(data)=>{
    movieContainer.innerHTML ="";
    movieContainer.classList.remove('noBackground');
    const{Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster}=data;
    const movieElement =document.createElement('div');
    movieElement.classList.add("movie-info");
    movieElement.innerHTML=`<h2>${Title}</h2> 
                            <p><strong>Rating:&#11088;</strong> ${imdbRating}</p>`;
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add("movie-genre");

    Genre.split(',').forEach(element =>{
        const p = document.createElement('p');
        p.innerText =element;
        movieGenreElement.appendChild(p);
    })
    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML +=`<p><strong>Released Date: </strong> ${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>plot: </strong>${Plot}</p>`;
    
    const moviePoster = document.createElement('div');
    moviePoster.classList.add("movie-poster");
    moviePoster.innerHTML = `<img src = "${Poster}"/>`
    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
    

}


function showErrorMessage (message){
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('noBackground');
}
function handleFormSubmission(e){
    e.preventDefault();
    const movieName =inputBox.value.trim();
    if(movieName !==""){
        movieContainer.innerHTML ="";
        movieContainer.classList.add('noBackground');
        const loader =document.createElement('div');
        loader.classList.add('loaderdiv');
        movieContainer.appendChild(loader)
        // showErrorMessage("Fetching Movie Information .....")
        getmovieInfo(movieName);
        // inputBox.value="";
    }
    else{
        showErrorMessage("Sorry we cannot enter the any text");
    }
}


searchFrom.addEventListener('submit',handleFormSubmission);


