import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, Volume2, VolumeX, Minus } from 'lucide-react';
import useModalStore from '../../store/modalStore';
import Button from './Button';
import { useState } from 'react';
import useMyListStore from '../../store/myListStore';
import Portal from './Portal';

const MOCK_EPISODES = [
  { 
    id: 1, 
    title: 'Pilot', 
    duration: '30 min', 
    desc: 'American football coach Ted Lasso is hired by a wealthy divorcee to coach the English soccer team AFC Richmond.', 
    image: '/images/image 233.png' 
  },
  { 
    id: 2, 
    title: 'Biscuits', 
    duration: '29 min', 
    desc: "It's Ted's first day of coaching, and fans aren't happy. He makes little headway but remains undeterred as the team.", 
    image: '/images/image 232.png' 
  },
  { 
    id: 3, 
    title: 'Trent Crimm: Independent', 
    duration: '30 min', 
    desc: 'To arrange an in-depth exposé, Rebecca pairs cynical journalist Trent Crimm with Ted for a day. Ted and Roy...', 
    image: '/images/image 235.png' 
  },
  { 
    id: 4, 
    title: 'For The Children', 
    duration: '33 min', 
    desc: 'Rebecca hosts the team\'s annual charity benefit, where Ted stages a reconciliation between Roy and Jamie.', 
    image: '/images/image 222.png' 
  },
  { 
    id: 5, 
    title: 'Tan Lines', 
    duration: '31 min', 
    desc: 'With his wife and son visiting from America, Ted makes drastic changes to the lineup during a critical match.', 
    image: '/images/image 221.png' 
  },
];

const MOCK_RECOMMENDATIONS = [
  { id: 1, image: '/images/image 21.png', match: '98%' },
  { id: 2, image: '/images/image 212.png', match: '96%' },
  { id: 3, image: '/images/Frame 77.png', match: '95%' },
  { id: 4, image: '/images/image11.png', match: '94%' },
  { id: 5, image: '/images/image 210.png', match: '90%' },
  { id: 6, image: '/images/image 215.png', match: '88%' },
];

const MovieModal = () => {
  const { isOpen, content, type, closeModal } = useModalStore();
  const movieId = content?.id;
  const movie = content;

  const inList = useMyListStore(state => state.myList.some(m => m.id === movieId));
  const { addMovie, removeMovie } = useMyListStore();

  const [isMuted, setIsMuted] = useState(true);
  const Motion = motion.div;

  const isSeries = type === 'series';

    const handleToggleList = (e) => {
    e.stopPropagation();
    if (inList) {
      removeMovie(movieId);
    } else {
      addMovie({ ...movie, id: movieId });
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && content && (
          <Motion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4! bg-black/60 backdrop-blur-sm"
          >
            <Motion
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#181818] rounded-2xl! overflow-hidden! shadow-2xl flex flex-col z-10"
            >
              <Button 
                variant="custom"
                onClick={closeModal}
                className="absolute top-4! right-4! z-50 p-2! bg-[#181818]/80 rounded-full hover:bg-[#22282A] transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </Button>

              <div className="overflow-y-auto custom-scrollbar flex-1 w-full">
                <div className="relative w-full aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />
                  <img 
                    src={content.image} 
                    alt={content.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-0 left-0 p-8! z-20 w-full">
                    <h2 className="text-4xl font-bold text-white mb-4! drop-shadow-lg">{content.title}</h2>
                    
                    <div className="flex items-center gap-4! mb-6!">
                      <Button variant="play" className="px-8! py-2! h-10! rounded text-sm">
                        <Play size={18} fill="currentColor" className="mr-2!" />
                        Mulai
                      </Button>
                      <Button  onClick={handleToggleList} variant="custom" className="w-10 h-10 rounded-full border-2 border-gray-500 hover:border-white transition-colors bg-[#22282A]/50 backdrop-blur-sm">
                        {inList ? <Minus size={18} className="text-white" /> : <Plus size={18} className="text-white" />}
                      </Button>
                      <Button 
                        variant="custom"
                        onClick={() => setIsMuted(!isMuted)}
                        className="ml-auto! w-10 h-10 rounded-full border-2 border-gray-500 hover:border-white transition-colors bg-[#22282A]/50 backdrop-blur-sm"
                      >
                        {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="px-8! pb-8! flex flex-col md:flex-row gap-8!">
                <div className="flex-1">
                  <div className="flex items-center gap-4! text-white/80 mb-6! text-sm">
                    <span className="text-green-500 font-bold">94% Match</span>
                    <span>{content.year || '2023'}</span>
                    <span className="border border-white/40 px-1! text-xs">
                      {content.ageRating || '13+'}
                    </span>
                    <span>{content.duration || (isSeries ? '10 Episode' : '2j 29m')}</span>
                    {content.quality && <span className="border border-white/40 px-1! text-xs">{content.quality}</span>}
                  </div>

                  <p className="text-white mb-8! leading-relaxed">
                    {content.description || (isSeries 
                      ? "Pelatih sepak bola perguruan tinggi Amerika Ted Lasso pergi ke London untuk mengelola AFC Richmond, tim sepak bola Liga Utama Inggris yang kesulitan."
                      : "Masih goyah karena kehilangan Gamora, Peter Quill mengumpulkan timnya untuk mempertahankan alam semesta dan salah satu dari mereka - sebuah misi yang bisa berarti akhir dari Penjaga jika tidak berhasil.")}
                  </p>

                  {isSeries ? (
                    <div className="mt-8!">
                      <div className="flex items-center justify-between mb-4!">
                        <h3 className="text-xl font-bold text-white">Episode</h3>
                        <span className="text-white/60 text-sm">Season 1</span>
                      </div>
                      <div className="space-y-4!">
                        {MOCK_EPISODES.map((ep) => (
                          <div key={ep.id} className="flex gap-4! p-4! hover:bg-[#22282A] rounded-lg transition-colors group cursor-pointer border-b border-gray-800 last:border-0">
                            <div className="text-2xl font-bold text-gray-500 self-center w-8">{ep.id}</div>
                            <div className="relative w-32 aspect-video flex-shrink-0 rounded overflow-hidden">
                              <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Play fill="white" className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-1!">
                                <h4 className="text-white font-bold truncate">{ep.title}</h4>
                                <span className="text-white/60 text-sm">{ep.duration}</span>
                              </div>
                              <p className="text-gray-400 text-sm line-clamp-2">{ep.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Movie Layout: Recommendations */
                    <div className="mt-8!">
                      <h3 className="text-xl font-bold text-white mb-4!">Rekomendasi Serupa</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4!">
                        {MOCK_RECOMMENDATIONS.map((rec) => (
                          <div key={rec.id} className="bg-[#22282A] rounded-lg overflow-hidden group cursor-pointer">
                            <div className="relative aspect-[2/3]">
                              <img src={rec.image} alt="Recommendation" className="w-full h-full object-cover" />
                              <div className="absolute top-2! right-2! bg-red-600 text-white text-[10px] px-1! font-bold rounded">Top 10</div>
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2!">
                                      <Play fill="white" className="w-8 h-8 text-white" />
                                  </div>
                              </div>
                            </div>
                            <div className="p-3!">
                               <div className="flex justify-between items-center text-sm text-gray-400">
                                  <span className="text-green-500 font-bold">{rec.match} Match</span>
                                  <span className="border border-gray-600 px-1! text-[10px]">13+</span>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-1/3 text-sm space-y-4!">
                  <div>
                    <span className="text-gray-500 block mb-1!">Cast:</span>
                    <span className="text-white block">
                      {content.cast || "Jason Sudeikis, Brett Goldstein, Brendan Hunt, Nick Mohammed, Juno Temple"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1!">Genre:</span>
                    <span className="text-white block">
                      {content.genre || "Komedi, Drama, Olahraga"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1!">Pembuat Film:</span>
                    <span className="text-white block">
                      {content.director || "Brendan Hunt, Joe Kelly, Bill Lawrence"}
                    </span>
                  </div>
                </div>
                </div>
              </div>
            </Motion>
          </Motion>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default MovieModal;
