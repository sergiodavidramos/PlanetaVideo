import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions";
import { Link } from "react-router-dom";
import "../assets/styles/components/Register.scss";
import Header from "../components/Header";

const Register = props => {
  const [form, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.registerUser(form, "/login");
  };
  return (
    <>
    <Header isRegister/>
    <section className="register">
      <section className="register_container">
        <h2>Registo de Usuario</h2>
        <form
          action=""
          className="register_container_form"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            onChange={handleInput}
            type="text"
            className="input"
            placeholder="Nombre de Usuario"
            required
          />
          <input
            name="email"
            onChange={handleInput}
            type="email"
            className="input"
            placeholder="Coreo Electronico"
            required
          />
          <input
            name="password"
            onChange={handleInput}
            type="password"
            className="input"
            placeholder="Contraseña"
          />

          <button className="button" type="submit" >Registrarme</button>
        </form>
        <p className="register_container-register">
          {" "}Ya tienes una cuenta
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </section>
    </>
  );
};
const mapDispatchToProps = {
  registerUser
};

export default connect(null, mapDispatchToProps)(Register);
