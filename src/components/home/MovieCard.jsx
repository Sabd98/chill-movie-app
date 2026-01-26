import { motion, AnimatePresence } from 'framer-motion';
import { Play, ThumbsUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useMyListStore from '../../store/myListStore';
import Button from '../ui/Button';
import Portal from '../ui/Portal';

const MovieCard = ({ movie, orientation = 'vertical', onMovieClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [portalProps, setPortalProps] = useState(null);
  const timeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const Motion = motion.div;
  const movieId = movie.id || movie.title;

  const inList = useMyListStore(state => state.myList.some(m => m.id === movieId));
  const { addMovie, removeMovie } = useMyListStore();

  const displayInfo = {
    match: movie.match || `${90 + (String(movieId).length % 10)}% Match`,
    ageRating: movie.ageRating || (String(movieId).length % 2 === 0 ? '18+' : '13+'),
    episodes: movie.episodes || `${10 + (String(movieId).length % 15)} Eps`,
    genres: movie.genres || (orientation === 'vertical' ? ['Aksi', 'Drama'] : ['Aksi'])
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
    }
    
    if (timeoutRef.current) return;

    timeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPortalProps({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
        });
        setIsHovered(true);
      }
    }, 400);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleToggleList = (e) => {
    e.stopPropagation();
    if (inList) {
      removeMovie(movieId);
    } else {
      addMovie({ ...movie, id: movieId });
    }
  };

  const handleClick = () => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  const renderBadge = () => movie.badge && (
    <div className={`absolute top-2! left-2! px-2! py-1! rounded text-[10px] font-bold z-10 ${
      movie.badge.type === 'top' 
        ? 'bg-[#E11D48] text-white' 
        : 'bg-[#1E40AF] text-white'
    }`}>
      {movie.badge.text}
    </div>
  );

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative ${orientation === 'vertical' ? 'p-2!' : 'p-1!'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={`${orientation === 'vertical' ? 'aspect-[2/3]' : 'aspect-video'} w-full`} />

        <Motion 
           className={`absolute top-0 left-0 w-full h-full cursor-pointer bg-[#181818] rounded-md overflow-hidden shadow-lg`}
        >
          <div className={`relative w-full h-full ${orientation === 'vertical' ? 'aspect-[2/3]' : 'aspect-video'}`}>
            {renderBadge()}
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-full object-cover block"
            />
          </div>
        </Motion>
      </div>

      {portalProps && (
        <Portal>
          <AnimatePresence onExitComplete={() => setPortalProps(null)}>
            {isHovered && (
              <div
                key="portal-container"
                style={{
                  position: 'absolute',
                  top: portalProps.top,
                  left: portalProps.left,
                  width: portalProps.width,
                  height: portalProps.height,
                  zIndex: 9999,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
              <Motion
                key="portal-card"
                style={{ pointerEvents: 'auto' }}
                className={`cursor-pointer bg-[#181818]/ rounded-md overflow-hidden shadow-lg origin-center`}
                initial={{ scale: 1 }}
                animate={{ scale: 1.6, transition: { duration: 0.2 } }}
                exit={{ scale: 1, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              >
                <div className={`relative w-full aspect-video`}>
                  {renderBadge()}
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-full object-cover block"
                  />
                </div>

                <Motion
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#181818] p-4!"
                >
                  <div className="flex items-center gap-2 mb-2!">
                    <Button variant="icon-play" className="scale-90">
                      <Play size={18} fill="black" />
                    </Button>
                    <Button 
                      variant="icon-outline"
                      onClick={handleToggleList}
                      className="scale-90"
                    >
                      {inList ? <Minus size={18} /> : <Plus size={18} />}
                    </Button>
                    <Button variant="icon-outline" className="scale-90">
                      <ThumbsUp size={16} />
                    </Button>
                    <Button variant="icon-outline" className="ml-auto scale-90">
                      <ChevronDown size={16} />
                    </Button>
                  </div>

                  <div className="text-white">
                    <div className="flex items-center gap-2 text-[10px] font-bold mb-1!">
                      <span className="text-green-500">{displayInfo.match}</span>
                      <span className="border border-gray-500 px-1! rounded-lg">{displayInfo.ageRating}</span>
                      <span>{displayInfo.episodes}</span>
                      <span className="border border-gray-500 px-1! rounded-lg text-[8px]">HD</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] text-gray-400">
                      {displayInfo.genres.map((genre, idx) => (
                        <span key={idx} className="relative [&:not(:last-child)]:after:content-['•'] [&:not(:last-child)]:after:ml-2 [&:not(:last-child)]:after:text-gray-600">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </Motion>
              </Motion>
              </div>
            )}
          </AnimatePresence>
      </Portal>
      )}
    </>
  );
};

export default MovieCard;
