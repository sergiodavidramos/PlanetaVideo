import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Search from "../components/Search";
import "../assets/styles/App.scss";
import Categories from "../components/categories";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";
import useInitialState from "../hooks/useInitialState";
import Header from "../components/Header";

const Home = ({ myList, trends, originals, search, user }) => {
  // Comento esto por que usare "Custom Hooks"
  /*   const [videos, setVideos] = useState({
    mylist: [],
    trends: [],
    originals: []
  });

  useEffect(() => {
    fetch("http://localhost:3000/initialState")
      .then(response => response.json())
      .then(data => setVideos(data));
  }, []);
  if (videos.length === 0) return null;    los datos que nos llegan
  tienen que estar siempre inicializado por que si no
  sera undefined y nos dara error */

  // console.log('Todo el estado: ', (state.trends.find(item=> item.title==='Elementary')) || (state.originals.find(item=> item.title==='Elementary')) );
  // console.log('Todo el estado: ', ));
  // console.log('esto es : ',search[0]==='');

  return (
    <>
      <Header />
      <Search isHome />
      {Object.keys(search).length > 0 && (
        <Categories title="Mi Buscador">
          <Carousel>
            {search.map(item => (
              <CarouselItem key={item.id} {...item} userId={user.id} />
            ))}
          </Carousel>
        </Categories>
      )}

      {myList.length > 0 && (
        <Categories title="Mi Lista">
          <Carousel>
            {myList.map(item => (
              <CarouselItem key={item.id} {...item} userId={user.id} isList />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories title="Tendencias">
        <Carousel>
          {trends.map(item => (
            <CarouselItem key={item.id} {...item} userId={user.id} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Originales">
        <Carousel>
          {originals.map(item => (
            <CarouselItem key={item.id} {...item} userId={user.id} />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};
const mapStateToProps = state => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
    search: state.search,
    user: state.user
  };
};
export default connect(mapStateToProps, null)(Home);
