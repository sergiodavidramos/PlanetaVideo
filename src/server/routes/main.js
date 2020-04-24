import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { StaticRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import axios from "axios";
import serverRoutes from "../../frontend/routes/serverRoutes";
import Layout from "../../frontend/components/Layout";
import reducer from "../../frontend/reducers";
import render from "../render";

require("dotenv").config();

const main = async (req, res, next) => {
  try {
    let initialState;

    try {
      const { token, email, name, id } = req.cookies;
      let user = {};

      if (email || name || id) {
        user = {
          id,
          email,
          name
        };
      }

      let movieList = await axios({
        url: `${process.env.API_URL}/api/movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: "get"
      });

      let userMovies = await axios({
        url: `${process.env.API_URL}/api/user-movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: "get"
      });

      movieList = movieList.data.data;
      userMovies = userMovies.data.data;

      initialState = {
        user,
        playing: {},
        search: {},
        myList: userMovies,
        trends: movieList.filter(
          movie => movie.contentRating === "PG" && movie._id
        ),
        originals: movieList.filter(
          movie => movie.contentRating === "G" && movie._id
        )
      };
    } catch (error) {
      initialState = {
        user: {},
        playing: {},
        search: {},
        myList: [],
        trends: [],
        originals: []
      };
    }
    const isLogged = initialState.user.id;
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <Layout>
            {renderRoutes(serverRoutes(isLogged))}
          </Layout>
        </StaticRouter>
      </Provider>
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (err) {
    next(err);
  }
};


export default main;
