import { gql } from "@apollo/client";


export const GET_MOVIES = gql`
   query SearchMovies($query: String!) {
  searchMovies(query: $query) {
    name
    id
    overview
    score
    releaseDate
    poster {
      medium
    }
  }
}

`;


export const GET_MOVIE_DETAILS = gql`
  query MovieDetails($movieId: ID!) {
    movie(id: $movieId) {
      id
      name
      releaseDate
      overview
      score
      poster {
        large
      }
      genres {
        name
      }
    }
  }
`;


export const GET_ALL = gql`
query {
    popularMovies {
      id
      name
      releaseDate
      overview
      genres {
        id
        name
      }
      poster {
        medium
      }
      score
    }
  }`
