import axios from "axios";

export const setFavorite = payload => ({
  type: "SET_FAVORITE",
  payload
});

export const deleteFavorite = payload => ({
  type: "DELETE_FAVORITE",
  payload
});

export const loginRequest = payload => ({
  type: "LOGIN_REQUEST",
  payload
});

export const logoutRequest = payload => ({
  type: "LOGOUT_REQUEST",
  payload
});

export const setError = payload => ({
  type: "SET_ERROR",
  payload
});

export const registerRequest = payload => ({
  type: "REGISTER_REQUEST",
  payload
});

export const getVideoSource = payload => ({
  type: "GET_VIDEO_SOURCE",
  payload
});

export const setSearch = payload => ({
  type: "SET_SEARCH",
  payload
});

export const registerUser = (payload, redirectUrl) => {
  return dispatch => {
    axios
      .post("/auth/sign-up", payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => (window.location.href = redirectUrl))
      .catch(err => dispatch(setError(err)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return dispatch => {
    axios({
      url: "/auth/sign-in",
      method: "post",
      auth: {
        username: email,
        password
      }
    })
      .then(({ data }) => {
        document.cookie = `email=${data.email}`;
        document.cookie = `name=${data.name}`;
        document.cookie = `id=${data.id}`;
        dispatch(loginRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch(err => dispatch(setError(err)));
  };
};

export const setUserMovie = (
  userId,
  { _id, cover, title, year, contentRating, duration }
) => {
  return dispatch => {
    axios
      .post("/user-movies", { userId, movieId: _id })
      .then(({ data }) =>
        dispatch(
          setFavorite({
            _id,
            cover,
            title,
            year,
            contentRating,
            duration
          })
        )
      )
      .catch(err => dispatch(setError(err)));
  };
};