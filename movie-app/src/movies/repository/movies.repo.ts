import { Injectable } from "@nestjs/common";
import { BasicUserInfo } from "../models/basic.user.info";
import { MovieModel } from "../models/movie.model";

@Injectable()
export class MovieRepo {
  constructor() {}

  private movies: MovieModel[] = [
    {
      Title: 'title',
      Released: Date.now().toString(),
      Genre: 'Horror',
      Director: 'John Grisham',
      UserId: 'Ade',
    },
  ];
  private basicUsers: BasicUserInfo[] = [];

  getAllMovies() {
    return this.movies;
  }

  addMovie(movie: MovieModel) {
    this.movies.push(movie);
    return movie;
  }

  findMoviesByTitle(title: string): MovieModel {
    return this.getAllMovies().find((x) => x.Title === title);
  }

  findMoviesByUserId(userId: string): MovieModel[] {
    return this.getAllMovies().filter((x) => x.UserId === userId);
  }

  getAllBasicUserRecord() {
    return this.basicUsers;
  }
  addBasicUserRecord(basicUserRecord: BasicUserInfo) {
    this.basicUsers = this.basicUsers.filter(
      (x) => x.userId !== basicUserRecord.userId,
    );
    this.basicUsers.push(basicUserRecord);
  }
  findBasicUserRecordByUserId(userId: string): BasicUserInfo {
    return this.basicUsers.find((x) => x.userId === userId);
  }
}