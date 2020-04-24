import React from "react";
import { connect } from "react-redux";
import classNames from "classNames";
import { setSearch } from "../actions";
import "../assets/styles/components/Search.scss";

const Search = ({ isHome, setSearch }) => {
  const inputStyles = classNames("input", {
    isHome
  });
  setSearch('');
  const handleInput = event => {
    if (event.target.value) {
      setSearch(event.target.value);
    }
    else{
      setSearch('');
    }
    // console.log(event.target.value);
  };

  return (
    <section className="main">
      <h2 className="main__title">¿Que quieres ver hoy?</h2>
      <input
        onChange={handleInput}
        className=" input__buscador"
        type="text"
        placeholder="Buscar..."
      />
      {/* input__buscador */}
    </section>
  );
};

const mapDispatchToProps = {
  setSearch
};

export default connect(null, mapDispatchToProps)(Search);
