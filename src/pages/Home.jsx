import { useFetch } from '../hooks/useFetch';
import Hero from '../components/home/Hero';
import MovieSection from '../components/home/MovieSection';
import MovieRow from '../components/home/MovieRow';
import '../styles/content.css';

const Home = () => {
  const { fetchedData, loading, error } = useFetch('/movies.json');

  const handleMovieClick = (movie) => {
    alert(`Membuka detail untuk: ${movie.title}`);
  };

  return (
    <main className="main-content">
      <Hero />
      {loading && <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading movies...</div>}
      {error && <div className="container" style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>}
      {!loading && !error && fetchedData && (
      <section className="content-sections">
        <div className="container">
          <MovieSection title="Melanjutkan Tonton Film" id="continuing-section">
            <MovieRow movies={fetchedData.continuing} onMovieClick={handleMovieClick} orientation="horizontal" />
          </MovieSection>

          <MovieSection title="Top Rating Film dan Series Hari ini">
            <MovieRow movies={fetchedData.topRating} onMovieClick={handleMovieClick} orientation="vertical" />
          </MovieSection>

          <MovieSection title="Film Trending">
            <MovieRow movies={fetchedData.trending} onMovieClick={handleMovieClick} orientation="vertical" />
          </MovieSection>

          <MovieSection title="Rilis Baru">
            <MovieRow movies={fetchedData.newRelease} onMovieClick={handleMovieClick} orientation="vertical" />
          </MovieSection>
        </div>
      </section>
      )}
    </main>
  );
};

export default Home;
