import React from 'react';
import {OutlineButton} from '../components/button/Button';
import {Link} from 'react-router-dom';

import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import {category, movieType, tvType} from '../api/tmdbApi';
import bg from '../assets/footer-bg.jpg';
const Home = () => {
  return (
    <div style={{backgroundImage: `url(${bg})`}}>
      <HeroSlide/>
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular}/>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated}/>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular}/>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top TV</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated}/>
        </div>
      </div>
    </div>
  )
}

export default Home;