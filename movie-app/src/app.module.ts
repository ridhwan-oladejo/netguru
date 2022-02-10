import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [ConfigModule.forRoot(), MoviesModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
