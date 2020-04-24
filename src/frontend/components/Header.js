import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import gravatar from "../utils/gravatar";

import { logoutRequest } from "../actions";
import "../assets/styles/components/Header.scss";
import logo from "../assets/static/logo-platzi-video.png";
import userIcon from "../assets/static/user-white.png";

const Header = props => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;
  const handleLogout = () => {
    document.cookie = "email=";
    document.cookie = "name=";
    document.cookie = "id=";
    document.cookie = "token=";
    props.logoutRequest({});
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__img" src={logo} alt="Logo" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {hasUser
            ? <img src={gravatar(user.email)} alt={user.email} />
            : <img src={userIcon} alt="user" />}

          <p>Perfil</p>
        </div>
        <ul>
          {hasUser
            ? <li>
                <Link to="#">
                  {user.name}
                </Link>
              </li>
            : null}

          {hasUser
            ? <li>
                <a href="/login" onClick={handleLogout}>
                  Cerrar Sesión
                </a>
              </li>
            : <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
