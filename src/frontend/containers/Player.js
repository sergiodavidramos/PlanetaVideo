import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getVideoSource } from "../actions";
import { Redirect } from "react-router-dom";
import NotFound from "./NotFound"; /* Otra forma es que hacer redireccionamiento */
import "../assets/styles/components/Player.scss";
const Player = props => {
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);
  const hasPlaying =
    Object.keys(props.playing).length >
    0; /* para transformar on Objeto a un array para poder usar length */

  useEffect(() => {
    props.getVideoSource(id);
    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Cargando...</h2>;
  }
  return hasPlaying ? (
    <div className="player">
      <video controls autoPlay>
        <source src={props.playing.source} type="video/mp4" />
      </video>
      <div className="player-back">
        <button onClick={() => props.history.goBack()} type="button">
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

const mapStateToProps = state => {
  return {
    playing: state.playing
  };
};

const mapDispatchToProps = {
  getVideoSource
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
