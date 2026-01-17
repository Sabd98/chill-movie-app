import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomPrevArrow = ({ onClick }) => (
  <button 
    className="carousel-arrow carousel-arrow-prev"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <ChevronLeft size={28} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button 
    className="carousel-arrow carousel-arrow-next"
    onClick={onClick}
    aria-label="Next slide"
  >
    <ChevronRight size={28} />
  </button>
);

const MovieRow = ({ movies, onMovieClick, orientation = 'vertical' }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className={`relative movie-row-wrapper mx-8! movie-row-${orientation}`}>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index}>
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieRow;
