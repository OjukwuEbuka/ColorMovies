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

  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  verticalAlign: "bottom",
  height: "100%",
  fontFamily: "Arial"

}));

const MyCard = styled(Box)(({ theme }) => ({

    marginTop: "1rem",
    // backgroundColor: "#ffb703",
  
}));

const MovieCard = (props: IProps) => {

  return (

    <MyCard sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <MovieImage>
              <img width={100} src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`} />
          </MovieImage>
        </Grid>
        <Grid item xs={12} md={6}>
          <MovieDetails sx={{ flexGrow: 1 }}>{props.movie.title} - {props.movie.release_date}</MovieDetails>
        </Grid>
        <Grid item xs={12} md={3}>
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