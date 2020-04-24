import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions";
import twitter from "../assets/static/twitter.png";
import search from "../assets/static/search.png";
import "../assets/styles/components/Login.scss";
import Header from "../components/Header";

const Login = props => {
  const [form, setValues] = useState({
    email: ""
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.loginUser(form, "/");
  };

  return (
    <>
      <Header isLogin />
      <section className="login">
        <section className="login_container">
          <h2>Inicio Sesión</h2>
          <form
            action=""
            className="login_container-form"
            onSubmit={handleSubmit}
          >
            <input
              name="email"
              onChange={handleInput}
              className="input"
              type="text"
              placeholder="Correo"
              required
            />
            <input
              name="password"
              onChange={handleInput}
              className="input"
              type="password"
              placeholder="Contraseña"
              required
            />

            <button className="button" type="submit">
              Iniciar Sesión
            </button>

            <div className="login_container-remember">
              <label>
                <input type="checkbox" id="box1" value="checkbox" />
                Recuerdame
              </label>
              <a href="/">Olvide mi contraseña</a>
            </div>
          </form>

          <section className="login_container-social-media">
            <div>
              <img src={search} alt="google" /> Inicia sesion con Google
            </div>
            <div>
              <img src={twitter} alt="twitter" width="16px" /> Inicia sesion con
              Twitter
            </div>
          </section>
          <p className="login_container-register">
            No tienes ninguna cuenta <Link to="/register">Registrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginUser
};

export default connect(null, mapDispatchToProps)(Login);
