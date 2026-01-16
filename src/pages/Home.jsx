import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MovieSection from '../components/MovieSection';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import '../styles/content.css';

const Home = () => {
  const { logout } = useAuth();
  const { fetchedData, loading, error } = useFetch('/movies.json');

  const handleMovieClick = (movie) => {
    alert(`Membuka detail untuk: ${movie.title}`);
  };

  return (
    <>
      <Header onLogout={logout} />
      <main className="main-content">
        <Hero />
        {loading && <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading movies...</div>}
        {error && <div className="container" style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>}
        {!loading && !error && fetchedData && (
        <section className="content-sections">
          <div className="container">
            <MovieSection title="Melanjutkan Tonton Film" id="continuing-section">
              <MovieRow movies={fetchedData.continuing} onMovieClick={handleMovieClick} />
            </MovieSection>

            <MovieSection title="Top Rating Film dan Series Hari ini">
              <MovieRow movies={fetchedData.topRating} onMovieClick={handleMovieClick} />
            </MovieSection>

            <MovieSection title="Film Trending">
              <MovieRow movies={fetchedData.trending} onMovieClick={handleMovieClick} />
            </MovieSection>

            <MovieSection title="Rilis Baru">
              <MovieRow movies={fetchedData.newRelease} onMovieClick={handleMovieClick} />
            </MovieSection>
          </div>
        </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
