# Movies Search Web-App

The MovieSearch app is built using the OMDB API's and only vanilla JavaScript and the Bootstrap CSS framework.


## Author

[@Naman Suresh Nag](https://github.com/NamanSnag/MovieSearch-App/tree/master)

### Details :

- This app allows users to search for movies, view details about individual movies, and add movies to a list of favorites.
- It includes several constants that are used to store references to DOM elements such as the search input field, the container for the search results, and the container for the favorite movies.
- There is an event listener attached to the search input field that listens for input events and sends a request to the OMDB API to search for movies matching the user's input. The response from the API is then used to create and display a card for each movie in the search results. Each card includes a "favorite" button and a "view details" button.
- The event listeners for the "favorite" and "view details" buttons handle adding or removing movies from the favorites list, and displaying the details for a movie in a modal window, respectively.
- The code also includes functions for storing and retrieving the favorites list from local storage.


## API Reference

#### Get api's and key 

```http
    https://www.omdbapi.com/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | f1c62b9b |

#### -> For searching the movie :

```http
// Search API Link: http://www.omdbapi.com/?s=${movie name}&apikey=f1c62b9b
```
#### -> Get movie by movie-Id :

```http
// Details API Link: http://www.omdbapi.com/?i=${movie id}&apikey=f1c62b9b
```

## -> GitHub hosted Link :

```http
https://namansnag.github.io/MovieSearchApp.github.io/
```