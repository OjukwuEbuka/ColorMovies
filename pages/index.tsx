import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { keys } from '../config'

import NavBar from '../components/NavBar'
import { Container, Button } from '@mui/material'

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

        <Container >

          <div>

            {
              
              movies.length > 0 && movies.map((movie, i) => (
                <li key={i}>
                  {movie.title}
                  {movie.poster_path}
                </li>
              ))

            }
            
          </div>

          <Button onClick={handleLoadMore} >Load More</Button>

        </Container>
      </main>

    </div>
  )
}


interface IMovie {
  title: string
  poster_path: string
}


export default Home
