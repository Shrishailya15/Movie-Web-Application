import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_DETAILS } from "../graphql/queries";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import "./MovieDetails.css";
import noPoster from "../images/no-poster.jpg";

const MovieDetails = ({ movieId }) => {

    const [isFavourite, setIsFavourite] = useState(false);
    
    const { data, loading, error } = useQuery(GET_MOVIE_DETAILS, {
        variables: { movieId },
        skip: !movieId,
    });

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setIsFavourite(favourites.includes(movieId)); //set true if movieId in localStorage.
    }, [movieId]);

   
    const handleToggleFavourites = () => {
        let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

        if (isFavourite) {
            favourites = favourites.filter(id => id !== movieId);
            alert("Removed from Favourites!");
        } else {
            favourites.push(movieId);
            alert("Added to Favourites!");

            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.innerHTML = "❤️";
            document.body.appendChild(heart);
            const buttonRect = document.querySelector(".fav-button").getBoundingClientRect();
            heart.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
            heart.style.top = `${buttonRect.top}px`;

            setTimeout(() => heart.remove(), 1000);
        }

        localStorage.setItem("favourites", JSON.stringify(favourites));
        setIsFavourite(!isFavourite);

        setTimeout(() => {
            window.location.href = "/home"; //goes to previous page.
        }, 1200);
    };

    if (loading) return <p style={{color:"white"}}>Loading movie details...</p>;
    if (error) return <p>Error loading details</p>;
    if (!data?.movie) return <p>No movie details found</p>;

    const { name, releaseDate, overview, score, poster, genres } = data.movie;

    return (
        <div className="movie-details-container">
            <div className="poster-container">
                <img src={poster?.large || noPoster} alt={name} className="movie-poster" />
            </div>
            <div className="movie-info">
                <h2 className="movie-title">{name}</h2>
                <p className="release-date">Released on: {releaseDate}</p>
                <p className="movie-overview">{overview}</p>
                
                <div className="movie-rating">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(score / 2) ? "star-filled" : "star-empty"} />
                    ))}
                </div>

                <div className="genres-container">
                    {genres.map((g, index) => (
                        <span key={index} className="genre-badge">{g.name}</span>
                    ))}
                </div>

                <button className="fav-button" onClick={handleToggleFavourites}>
                    {isFavourite ? <FaHeart className="heart-icon filled" /> : <FaRegHeart className="heart-icon empty" />} 
                    <span className="fav-text">{isFavourite ? " Remove from Favourites" : " Add to Favourites"}</span>
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
