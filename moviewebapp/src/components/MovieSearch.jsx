import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MOVIES, GET_MOVIE_DETAILS, GET_ALL } from "../graphql/queries";
import "./MovieSearch.css";
import noPoster from "../images/no-poster.jpg";

const MovieSearch = ({ onSelectMovie }) => {
    const [search, setSearch] = useState("");
    const [showFavourites, setShowFavourites] = useState(false);
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const { data, loading, error, refetch } = useQuery(GET_MOVIES, {
        variables: { query: search },
        skip: !search || showFavourites,
    });

    const { data: allMoviesData, loading: allMoviesLoading, error: allMoviesError } = useQuery(GET_ALL);
    const [fetchMovieDetails] = useLazyQuery(GET_MOVIE_DETAILS);

    useEffect(() => {
        if (allMoviesData?.popularMovies) {
            setAllMovies(allMoviesData?.popularMovies);
        }
        console.log(allMoviesData)
    }, [allMoviesData]);

    useEffect(() => {
        const fetchFavourites = async () => {
            if (showFavourites) {

                const favouriteIds = JSON.parse(localStorage.getItem("favourites")) || [];

                if (favouriteIds.length > 0) {
                    try {
                        const responses = await Promise.all(
                            favouriteIds.map(movieId => fetchMovieDetails({ variables: { movieId } }))
                        );

                        const movies = responses
                            .map(res => res?.data?.movie)
                            .filter(movie => movie !== undefined);

                        setFavouriteMovies(movies);
                    } catch (error) {
                        console.error("Error fetching favourite movies:", error);
                    }
                } else {
                    setFavouriteMovies([]);
                }
            }
        };
        fetchFavourites();
    }, [showFavourites]);

    const handleSearch = () => {
        setShowFavourites(false);
        if (search) refetch({ query: search });
    };

    const handleFavourite = () => {
        setShowFavourites(true);
    };

    const moviesToShow = showFavourites? favouriteMovies : search ? data?.searchMovies : allMovies;

    return (
        <div className="movie-search-container">
            <h2>Search Movies</h2>

            <div className="search-box">
                <input type="text" placeholder="Enter movie name..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleFavourite}>Favourites</button>
            </div>

            {(loading || allMoviesLoading) && <p>Loading...</p>}
            {(error || allMoviesError) && <p>Error fetching movies</p>}

            <div className="movie-list">
                {moviesToShow?.map((movie) => (
                    <div key={movie.id} className="movie-card" onClick={() => onSelectMovie(movie.id)}>
                        <img src={movie.poster?.medium || movie.poster?.large || noPoster} alt={movie.name} />

                        <div style={{ marginTop: 15 }}>
                            <h3>{movie.name}</h3>
                            <h3> ({movie.releaseDate})</h3>
                        </div>

                        <div className="movie-card-footer">
                            <p className="rating">Rating: {movie.score}</p>
                        </div>
                    </div>
                ))}
                <div>
                    {showFavourites && favouriteMovies.length === 0 ? <p>No favourite movies found.</p> :""}
                </div>
            </div>
        </div>
    );
};

export default MovieSearch;
