import { Play, Info, Volume2, VolumeX, Pause } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="hero relative min-h-[85vh] flex items-start overflow-hidden">
      <div className="hero-background absolute top-0 left-0 w-full h-full z-[1]">
        {!isPlaying ? (
          <img src="/Hero.png" alt="Duty After School" className="w-full h-full object-cover" />
        ) : (
          <video 
            autoPlay 
            muted={isMuted} 
            loop 
            className="w-full h-full object-cover"
            src="https://archive.org/download/duty-after-school-s-01-e-10-kimoi-tv.com/Duty_After_School_S01E01_KimoiTV.com.mp4" 
          />
        )}
      </div>
      <div className="hero-content relative z-[3] w-full">
        <div className="container px-4 md:px-10">
          <div className="hero-info max-w-[600px] mt-[180px]! ml-4!">
            <h1 className="text-[3.5rem] font-bold mb-4! leading-tight text-white">Duty After School</h1>
            <p className="text-[1.1rem] leading-relaxed mb-8! text-white/90 max-w-[500px]">
              Sebuah benda tak dikenal mengambil alih dunia. Dalam
              keputusasaan, Departemen Pertahanan mulai merekrut siswa sekolah
              menengah. Mereka pun segera menjadi pejuang garis depan dalam
              perang.
            </p>
            <div className="flex items-center gap-4">
              <Button 
                variant="play"
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full! font-bold hover:bg-white/10"
                icon={isPlaying?<Pause size={20} fill="white" />:<Play size={20} fill="white" /> }
              >
                {isPlaying ? 'Berhenti' : 'Putar'}
              </Button>
              <Button 
                variant="info"
                className="rounded-full font-bold hover:bg-white/10"
                icon={<Info size={20} />}
              >
                Selengkapnya
              </Button>
              <div className="ml-auto flex items-center gap-4">
                <Button 
                  variant="volume"
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10! h-10! flex items-center justify-center rounded-full! border border-white/40! text-white! hover:bg-white/10!"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
                <span className="border border-white/40 px-3! py-1! rounded-sm text-white font-medium">18+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#181a1c] to-transparent z-[2]" />
    </section>
  );
};

export default Hero;
