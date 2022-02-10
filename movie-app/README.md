## TOD0
```bash
$ Define Post endpoint for movie {Authorized user only}
`Basic` users are restricted to create 5 movies per month (calendar
      month). `Premium` users have no limits.
      
$ Call IMDB with https://www.omdbapi.com/?t=Spider-Man:%20No%20Way%20Home&apikey=4beab0f8
$ Populate Model with result
$ Persist result in fakedb
$ Call Authentication to generate token

```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ SECRET_KEY=secret docker-compose up dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```