import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [popularPodcasts, setPopularPodcasts] = useState([]);

  useEffect(() => {
    // Fetch popular podcasts from the backend
    fetch('/api/popular')
      .then((res) => res.json())
      .then((data) => setPopularPodcasts(data))
      .catch((error) => console.error('Error fetching popular podcasts:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Podcast App</h1>
        <nav>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Most Popular Podcasts</h2>
        <ul>
          {popularPodcasts.map((podcast) => (
            <li key={podcast.id}>{podcast.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default HomePage;