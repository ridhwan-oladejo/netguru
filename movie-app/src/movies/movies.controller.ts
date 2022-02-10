import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { request } from 'http';
import { CreateMovieDto } from './dtos/movie.dto';
import { JwtAuthGuard } from './security/guards/jwt.guard';
import { MoviesService, User } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  postMovie(@Req() request, @Body() movie: CreateMovieDto) {
    return this.movieService.createMovie(movie, request.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getMoviesByUser(@Req() request) {
    console.log(request.user)
    return this.movieService.getMoviesByUser(request.user);
  }

  @Get('/movs')
  getBasicMovies() {
    return this.movieService.getBAsicUserMovie();
  }
}
