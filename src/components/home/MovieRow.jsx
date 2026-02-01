import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cn } from '../../utils/cn';

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
    slidesToShow: orientation === 'vertical' ? 6 : 5,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: orientation === 'vertical' ? 5 : 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: orientation === 'vertical' ? 4 : 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: orientation === 'vertical' ? 2.5 : 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: orientation === 'vertical' ? 2.2 : 1.5,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className={cn(
      "relative movie-row-wrapper mx-8! movie-row-" + orientation
    )}>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index}>
            <MovieCard movie={movie} orientation={orientation} onMovieClick={onMovieClick} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieRow;
