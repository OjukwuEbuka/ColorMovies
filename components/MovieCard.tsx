import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { IMovie } from '../types'

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
    border: "0.5px dashed brown",
    borderRadius: "1rem",
    backgroundColor: "#b4e3c0",
  
}));

const MovieCard = (props: IProps) => {

  return (

    <MyCard sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <MovieImage>
              <img className="movieImage" src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`} />
          </MovieImage>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MovieDetails sx={{ flexGrow: 1 }}>{props.movie.title} - {props.movie.release_date}</MovieDetails>
        </Grid>
        <Grid item xs={12} sm={3}>
          <MovieDetails>{props.movie.vote_average}</MovieDetails>
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