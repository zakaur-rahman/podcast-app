import React from 'react';
//import Banner from '../banner/Banner';
import Categories from '../components/Categories';
import Podcasts from '../components/Podcast/Podcasts.jsx';
import { Header } from '../Routes.js';
import Banner from '../components/Banner.jsx';

const Home = () => {
  return (
    <> <Header/>
    <Banner/>
      <div className="flex">
        <div className="w-1/4">
          <Categories />
        </div>
        <div className="w-3/4">
          <Podcasts />
        </div>
      </div>
    </>
  );
}

export default Home;