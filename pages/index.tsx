import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { keys } from '../config'
import { 
  IconButton, 
  Button, 
  styled, 
  Box 
} from '@mui/material'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'

import NavBar from '../components/NavBar'
import MovieCard from '../components/MovieCard'
import { IMovie } from '../types'

const MovieContainer = styled(Box)(({ theme }) => ({

  padding: theme.spacing(5),
  backgroundColor: "#dfe9e6",

}));

const LoadButton = styled(Button)(({ theme }) => ({

  backgroundColor: "#023047",
  margin: "1rem",

}));

enum MovieSortMode {ASCENDING, DESCENDING};

const Home: NextPage = () => {

  const [movies, setMovies] = useState<IMovie[]>([])
  const maxMoviePage = 25;
  const [clickedMovies, setClickedMovies] = useState<number[]>([])
  const [movieSortMode, setMovieSortMode] = useState<MovieSortMode>(MovieSortMode.DESCENDING)

  
 
  useEffect(() => {

    if(movies.length === 0){
      
      handleLoadMovies(1)
      
    }
  
  })


  useEffect(() => {

    const clickedMoviesStorage = localStorage.getItem("colorMovies");
    const clickedMoviesObject = clickedMoviesStorage ? JSON.parse(clickedMoviesStorage) : {ids: []};
    
    if(clickedMoviesObject.ids.length > 0){

      console.log([...clickedMoviesObject.ids])
      setClickedMovies([...clickedMoviesObject.ids])

    }

  }, [])

  const handleLoadMovies = async (moviePageNumber: number) => {

    try {

      let loadedMovies: IMovie[] = [];
      let API_KEY = process.env.API_KEY || keys.apiKey
  
      let res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${moviePageNumber}`)
      let jsonData = await res.json() 
    
      if(jsonData.results && jsonData.results.length > 1){
  
        loadedMovies = jsonData.results as IMovie[];
        let newMoviesArray = []

        if(movieSortMode === MovieSortMode.ASCENDING){

          loadedMovies = loadedMovies.sort(sortAscendingHelper)
          newMoviesArray = [...loadedMovies, ...movies]

        }
        else
        {
          newMoviesArray = [...movies, ...loadedMovies]
        }
  
        setMovies(newMoviesArray)

      }  

    } catch (error) {
      console.log(error)
    }


  }

  const handleLoadMore = () => {

    let currentMoviesPage = movies.length / 20;

    if(currentMoviesPage < maxMoviePage){

      handleLoadMovies(currentMoviesPage + 1)

    }
    
  }

  const sortDescending = () => {

    let currentMovies = [...movies].sort(sortDescendingHelper);

    setMovieSortMode(MovieSortMode.DESCENDING)
    setMovies(currentMovies)
    
  }

  const sortAscending = () => {

    let currentMovies = [...movies].sort(sortAscendingHelper);

    setMovieSortMode(MovieSortMode.ASCENDING)
    setMovies(currentMovies)
    
  }

  const sortDescendingHelper = (movie1: IMovie, movie2: IMovie) => {

    if(parseFloat(movie1.vote_average) > parseFloat(movie2.vote_average)){
        return -1;
    } else if(parseFloat(movie1.vote_average) < parseFloat(movie2.vote_average)) {
        return 1;
    } else {
        return 0;
    }

  }

  const sortAscendingHelper = (movie1: IMovie, movie2: IMovie) => {

    if(parseFloat(movie1.vote_average) < parseFloat(movie2.vote_average)){
        return -1;
    } else if(parseFloat(movie1.vote_average) > parseFloat(movie2.vote_average)) {
        return 1;
    } else {
        return 0;
    }

  }

  const handleMovieStarClick = (isMovieClicked: boolean, movieId: number) => {

    let newClickedMoviesArray = [];

    if(isMovieClicked){
        
        newClickedMoviesArray = [...clickedMovies].filter(id => movieId !== id);
        
    }
    else
    {
        
        newClickedMoviesArray = [...clickedMovies, movieId];
    }

    localStorage.setItem("colorMovies", JSON.stringify({ids: newClickedMoviesArray}))
    setClickedMovies(newClickedMoviesArray)
        
  }

  return (
    <div>
      <Head>
        <title>ColorMovies</title>
        <meta name="description" content="ColorMovies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main >

        <NavBar />


          <MovieContainer className="movieContainer">
        
            <Box  sx={{
              display: 'flex',
              justifyContent: 'right',
            }}>
              <IconButton onClick={sortDescending} title="Sort Descending" >
                <ArrowUpward />
              </IconButton>
              <IconButton onClick={sortAscending} title="Sort Ascending" >
                <ArrowDownward />
              </IconButton>
            </Box>

            <div>

              {
                
                movies.length > 0 && movies.map((movie, i) => (

                  <MovieCard 
                    key={i} movie={movie} 
                    isMovieClicked={clickedMovies.includes(movie.id)} 
                    handleMovieStarClick={handleMovieStarClick}
                  />

                ))

              }
              
            </div>

              <Box  sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
              }}>
                <LoadButton onClick={handleLoadMore} size="large" variant="contained" >Load More</LoadButton>
              </Box>
          
          </MovieContainer>
      </main>

    </div>
  )
}


export default Home
