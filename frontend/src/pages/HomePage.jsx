import React from 'react';
import Categories from '../components/Categories';
import Podcasts from '../components/Podcast/Podcasts.jsx';
import { Header } from '../Routes.js';
import Banner from '../components/Banner.jsx';

const Home = () => {
  return (
    <> <Header/>
    <Banner/>
      <div className="flex p-2">
        <div className="w-1/4 ">
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