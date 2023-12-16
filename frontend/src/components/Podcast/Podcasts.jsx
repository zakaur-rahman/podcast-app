import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../../service/api';

// Components
import Podcast from './podcast';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || '' });
      if (response.success) {
        setPodcasts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="flex flex-wrap">
      {podcasts?.length ? (
        podcasts.map((post) => (
          <div key={post._id} className="lg:w-1/4 sm:w-1/2 xs:w-full p-4">
            <Link to={`details/${post._id}`} className="no-underline text-black">
              <Podcast post={post} />
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-700 text-lg mx-auto mt-8">
          No data is available for the selected category.
        </p>
      )}
    </div>
  );
};

export default Podcasts;
