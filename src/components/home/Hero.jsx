import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="hero relative h-[70vh] flex items-center overflow-hidden">
      <div className="hero-background absolute top-0 left-0 w-full h-full z-[1]">
        <img src="/Hero.png" alt="Duty After School" className="w-full h-full object-cover" />
      </div>
      <div className="hero-content relative z-[3] w-full">
        <div className="container">
          <div className="hero-info max-w-[600px] relative top-24 left-5">
            <h1 className="text-[2rem] font-bold mb-6! leading-tight text-white [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]">Duty After School</h1>
            <p className="text-[1rem] leading-relaxed mb-8! text-white/90 [text-shadow:1px_1px_6px_rgba(0,0,0,0.7)]">
              Sebuah benda tak dikenal mengambil alih dunia. Dalam
              keputusasaan, Departemen Pertahanan mulai merekrut siswa sekolah
              menengah. Mereka pun segera menjadi pejuang garis depan dalam
              perang.
            </p>
            <div className="hero-flex relative flex justify-start items-center gap-4 w-full">
              <div className="flex items-center gap-4 flex-wrap">
                <Button variant="play" icon={<Play size={20} />}>
                  Mulai
                </Button>
                <Button variant="info" icon={<Info size={20} />}>
                  Selengkapnya
                </Button>
                <span className="bg-white/10 text-white px-3! py-1.5! rounded font-semibold text-[0.9rem] border border-white/30">18+</span>
              </div>
              <Button 
                variant="volume" 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
