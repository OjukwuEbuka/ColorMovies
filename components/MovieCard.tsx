import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { StarRate } from '@mui/icons-material';

import { IMovie } from '../types'
import { useEffect, useState } from 'react';

const MovieImage = styled(Box)(({ theme }) => ({

  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

const MovieDetails = styled(Box)(({ theme }) => ({

  textAlign: 'center',
  color: theme.palette.text.secondary,
  verticalAlign: "bottom",
  height: "100%",
  fontFamily: "Nunito Sans",
  fontWeight: "bolder"

}));

const MyCard = styled(Box)(({ theme }) => ({

    marginTop: "1rem",
    padding: ".2rem 0",
    border: "0.09px dashed brown",
    borderRadius: "1rem",
    backgroundColor: "#b4e3c0",
  
}));



const MovieCard = (props: IProps) => {

    const [isMovieClicked, setIsMovieClicked] = useState(false);
    const dateArray = props.movie.release_date.split('-')

    useEffect(() => {

        const clickedMoviesStorage = localStorage.getItem("colorMovies");
        const clickedMoviesObject = clickedMoviesStorage ? JSON.parse(clickedMoviesStorage) : {ids: []};
        
        if(clickedMoviesObject.ids.includes(props.movie.id)){

            setIsMovieClicked(true)
        }

    }, [])

    const handleStarClick = () => {

        let newClickedMoviesArray = [];
        const clickedMoviesStorage = localStorage.getItem("colorMovies");
        const clickedMoviesObject = clickedMoviesStorage ? JSON.parse(clickedMoviesStorage) : {ids: []};
            

        if(clickedMoviesObject.ids.includes(props.movie.id)){
            
            newClickedMoviesArray = [...clickedMoviesObject.ids].filter(id => props.movie.id !== id);
            localStorage.setItem("colorMovies", JSON.stringify({ids: newClickedMoviesArray}))
            setIsMovieClicked(false)
            
        }
        else
        {
            
            newClickedMoviesArray = [...clickedMoviesObject.ids, props.movie.id];
            localStorage.setItem("colorMovies", JSON.stringify({ids: newClickedMoviesArray}))
            setIsMovieClicked(true)
            
        }
        
        // setClickedMovies([...newClickedMoviesArray])

    }

    return (


        <MyCard className={isMovieClicked ? "clickedMovieCard" : "movieCard" } sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>

                    <a href={`https://www.themoviedb.org/movie/${props.movie.id}`}>
                        <MovieImage>
                            <img className="movieImage" src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`} />
                        </MovieImage>
                    </a>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <a href={`https://www.themoviedb.org/movie/${props.movie.id}`}>
                        <MovieDetails sx={{ flexGrow: 1 }}>{props.movie.title} - {dateArray[0]}</MovieDetails>
                    </a>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item sm={6}>
                            <MovieDetails>{props.movie.vote_average}/10</MovieDetails>                            
                        </Grid>
                        <Grid item sm={6}>
                            <StarRate onClick={handleStarClick} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MyCard>


    );

}

interface IProps {
    key: number
    movie: IMovie
}

export default MovieCard;