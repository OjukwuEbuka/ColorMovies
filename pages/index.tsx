import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { keys } from '../config'
import { 
  Container, 
  Button, 
  styled, 
  Box 
} from '@mui/material'

import NavBar from '../components/NavBar'
import MovieCard from '../components/MovieCard'
import { IMovie } from '../types'

const MovieContainer = styled(Container)(({ theme }) => ({

  padding: theme.spacing(5),
  backgroundColor: "#219ebc",

}));

const LoadButton = styled(Button)(({ theme }) => ({

  backgroundColor: "#023047",
  margin: "1rem",
  alignSelf: "center"

}));

const Home: NextPage = () => {

  const [movies, setMovies] = useState<IMovie[]>([])
  const maxMoviePage = 25;
 
  useEffect(() => {

    if(movies.length === 0){
      
      handleLoadMovies(1)
      
    }
  
  })


  const handleLoadMovies = async (moviePageNumber: number) => {

    try {
      let newMovies: IMovie[] = [];
  
      let res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.apiKey}&page=${moviePageNumber}`)
      let jsonData = await res.json() 
    
      if(jsonData.results && jsonData.results.length > 1){
  
        newMovies = jsonData.results as IMovie[];
  
        setMovies([...movies, ...newMovies])
  
        console.log(newMovies)
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

  return (
    <div>
      <Head>
        <title>ColorMovies</title>
        <meta name="description" content="ColorMovies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main >

        <NavBar />


          <MovieContainer>
            <div>

              {
                
                movies.length > 0 && movies.map((movie, i) => (
                  <MovieCard key={i} movie={movie} />
                ))

              }
              
            </div>

            <LoadButton onClick={handleLoadMore} size="large" variant="contained" >Load More</LoadButton>
          
          </MovieContainer>
      </main>

    </div>
  )
}


export default Home
