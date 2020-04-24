import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setUserMovie, deleteFavorite } from "../actions";
import "../assets/styles/components/CarouselItem.scss";
import removeIcon from "../assets/static/remove-icon.png";
const CarouselItem = props => {
  const {
    _id,
    cover,
    title,
    year,
    contentRating,
    duration,
    setUserMovie,
    deleteFavorite,
    isList,
    userId
  } = props;
  const handleSetFavorite = () => {
    setUserMovie(userId, {
      _id,
      cover,
      title,
      year,
      contentRating,
      duration
    });
  };

  const handleDeleteFavorite = itemId => {
    deleteFavorite(itemId);
  };

  return _id !== undefined
    ? <div className="carousel-item">
        <img className="carousel-item__img" src={cover} alt={title} />
        <div className="carousel-item__details">
          <div>
            <Link to={`/player/${_id}`}>
              <img
                src="https://img.icons8.com/flat_round/64/000000/play--v1.png"
                alt="play"
              />
            </Link>
            {isList
              ? <img
                  src={removeIcon}
                  alt="remove"
                  onClick={() => handleDeleteFavorite(id)}
                />
              : <img
                  src="https://img.icons8.com/color/48/000000/add.png"
                  alt="plus"
                  onClick={handleSetFavorite}
                />}
          </div>
          <p className="carousel-item__title">
            {title}
          </p>
          <p className="carousel-item__subtitle">
            {`${year} ${contentRating} ${duration}`}
          </p>
        </div>
      </div>
    : <h3>No encontrado</h3>;
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number
};

const mapDispatchToProps = {
  setUserMovie,
  deleteFavorite
};

export default connect(null, mapDispatchToProps)(CarouselItem);
