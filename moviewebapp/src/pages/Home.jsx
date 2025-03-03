import React, { useState } from "react";
import MovieSearch from "../components/MovieSearch";
import MovieDetails from "../components/MovieDetails";
import Modal from "react-modal";
import "./Home.css";

Modal.setAppElement("#root");

const Home = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectMovie = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <h1>🎬 Cinematic Explorer</h1>

      <div className="movie-search-container">
        <MovieSearch onSelectMovie={handleSelectMovie} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal" overlayClassName="modal-overlay" >
        <button className="close-button" onClick={closeModal}></button>
        {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
      </Modal>

    </div>
  );
};

export default Home;
