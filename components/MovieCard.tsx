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

    const dateArray = props.movie.release_date.split('-')

    const handleStarClick = () => {

        props.handleMovieStarClick(props.isMovieClicked, props.movie.id)
        
    }

    return (


        <MyCard className={props.isMovieClicked ? "clickedMovieCard" : "movieCard" } sx={{ flexGrow: 1 }}>
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
    isMovieClicked: boolean
    handleMovieStarClick: (isMovieClicked: boolean, movieId: number) => void
}

export default MovieCard;