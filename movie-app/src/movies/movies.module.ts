import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';
import { ImdbClient } from './imdb.client';
import { JwtStrategy } from './security/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MovieRepo } from './repository/movies.repo';

@Module({
  imports: [HttpModule],
  providers: [MoviesService, ImdbClient, JwtStrategy, MovieRepo],
  controllers: [MoviesController],
})
export class MoviesModule {}
