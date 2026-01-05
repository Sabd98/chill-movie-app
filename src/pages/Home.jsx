import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MovieSection from '../components/MovieSection';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import { movieData } from '../data/movieData';
import '../styles/content.css';

const Home = () => {
  const { logout } = useAuth();

  const handleMovieClick = (movie) => {
    alert(`Membuka detail untuk: ${movie.title}`);
  };

  return (
    <>
      <Header onLogout={logout} />
      <main className="main-content">
        <Hero />
        <section className="content-sections">
          <div className="container">
            <MovieSection title="Melanjutkan Tonton Film" id="continuing-section">
              <MovieRow movies={movieData.continuing} onMovieClick={handleMovieClick} />
            </MovieSection>

            <MovieSection title="Top Rating Film dan Series Hari ini">
              <MovieRow movies={movieData.topRating} onMovieClick={handleMovieClick} />
            </MovieSection>

            <MovieSection title="Film Trending">
              <MovieRow movies={movieData.trending} onMovieClick={handleMovieClick} />
            </MovieSection>

            <MovieSection title="Rilis Baru">
              <MovieRow movies={movieData.newRelease} onMovieClick={handleMovieClick} />
            </MovieSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
