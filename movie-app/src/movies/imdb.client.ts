import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MovieModel } from './models/movie.model';

@Injectable()
export class ImdbClient {
  constructor(private readonly httpService: HttpService) {}
  apiKey = process.env.API_KEY;

  getMoviesFromImdb(title: string, userId: string): Observable<MovieModel | undefined> {
    const newTitle = title.replace(' ', '%20');
    const url = `https://www.omdbapi.com/?t=${newTitle}&apikey=${this.apiKey}`;

    return this.httpService.get(url).pipe(
      map((response) => response.data),
      map((data: MovieModel) => ({
        Released: data.Released,
        Genre: data.Genre,
        Director: data.Director,
        Title: data.Title,
        UserId:userId
      })),
    );
  }
}
