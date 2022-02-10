import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateMovieDto } from './dtos/movie.dto';
import { ImdbClient } from './imdb.client';
import { BasicUserInfo } from './models/basic.user.info';
import { MovieModel } from './models/movie.model';
import { MovieRepo } from './repository/movies.repo';

export type User = {
  userId: string;
  name: string;
  role: string;
  iat: string;
  exp: string;
};

@Injectable()
export class MoviesService {
  constructor(
    private readonly imdbClient: ImdbClient,
    private readonly movieRepo: MovieRepo,
  ) {}

  async createMovie(newMovie: CreateMovieDto, user: User) {
    const { title } = newMovie;
    const { role } = user;

    let validUser: BasicUserInfo = {
      userId: '',
      dateOfFirstCreation: new Date(),
      count: 0,
    };

    if (role === 'basic') {
      validUser = this.checkUser(user);
      if (validUser === undefined) {
        return new BadRequestException(
          'User cannot create any record',
        ).getResponse();
      }
    }

    const exist = this.movieRepo.findMoviesByTitle(title);
    if (exist) {
      return new BadRequestException('Movie already exist').getResponse();
    }

    const movie = await firstValueFrom(
      this.imdbClient.getMoviesFromImdb(title,user.userId),
    );

    this.movieRepo.addMovie(movie)
    if (!movie.Title) {
      return new NotFoundException('Movie does not exist').getResponse();
    }
    if (role === 'basic') {
      validUser.count = validUser.count + 1;
      this.movieRepo.addBasicUserRecord(validUser);
    }
    return movie;
  }

  checkUser(user: User): BasicUserInfo | undefined {
    const basicUser = this.movieRepo.findBasicUserRecordByUserId(user.userId);
    if (basicUser) {
      const today = new Date();
      const firsDay = basicUser.dateOfFirstCreation;
      //lastDay = lastDay.setMonth(lastDay.getMonth + 3);
      if (basicUser.count < 5 && today.getMonth() - firsDay.getMonth() < 3) {
        return basicUser;
      } else {
        return undefined;
      }
    } else {
      return {
        userId: user.userId,
        dateOfFirstCreation: new Date(),
        count: 0,
      };
    }
  }

  getMovies(): MovieModel[] {
    return this.movieRepo.getAllMovies();
  }
  getMoviesByUser(user: User): MovieModel[] {
    const { userId } = user;
    console.log(userId)
    return this.movieRepo.findMoviesByUserId(userId);
  }
  getBAsicUserMovie(): BasicUserInfo[] {
    return this.movieRepo.getAllBasicUserRecord();
  }
}
