import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import '../styles/footer.css';

const FooterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="footer-accordion-item">
      <button 
        className="footer-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronRight 
          size={20} 
          className="footer-accordion-arrow"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div className={`footer-accordion-content ${isOpen ? 'active' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer bg-[#1a1a1a] border-t border-[#333333]">
      <div className="container">
        <div className="desktop-footer grid grid-cols-[1fr_2fr_2fr] gap-12 items-center">
          <div className="text-center md:text-left flex flex-col items-center md:items-start ">
            <img src="/Logo.png" alt="Logo" className="h-10" />
            <p className="text-[#b3b3b3] text-[0.9rem] mt-4!">©2023 Chill All Rights Reserved</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="footer-section-title">Genre</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Aksi</a></li>
                <li><a href="#" className="footer-link">Anak-anak</a></li>
                <li><a href="#" className="footer-link">Anime</a></li>
                <li><a href="#" className="footer-link">Britania</a></li>
                <li><a href="#" className="footer-link">Komedi</a></li>
                <li><a href="#" className="footer-link">Petualangan</a></li>
                <li><a href="#" className="footer-link">Perang</a></li>
                <li><a href="#" className="footer-link">Romantis</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-section-title"></h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Drama</a></li>
                <li><a href="#" className="footer-link">Fantasi Ilmiah & Fantasi</a></li>
                <li><a href="#" className="footer-link">Kejahatan</a></li>
                <li><a href="#" className="footer-link">KDrama</a></li>
                <li><a href="#" className="footer-link">Sains & Alam</a></li>
                <li><a href="#" className="footer-link">Thriller</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="footer-section-title">Bantuan</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Kontak Kami</a></li>
              <li><a href="#" className="footer-link">Privasi</a></li>
              <li><a href="#" className="footer-link">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile Accordion Footer */}
        <div className="mobile-footer">
          <div className="mb-4! text-center">
            <img src="/Logo.png" alt="Logo" className="h-10 mb-4! mx-auto!" />
            <p className="text-[#b3b3b3] text-[0.85rem]">©2023 Chill All Rights Reserved</p>
          </div>
          <div className="footer-mobile-accordion">
            <FooterAccordion title="Genre">
              <ul>
                <li><a href="#" className="footer-mobile-link">Aksi</a></li>
                <li><a href="#" className="footer-mobile-link">Drama</a></li>
                <li><a href="#" className="footer-mobile-link">Anak-anak</a></li>
                <li><a href="#" className="footer-mobile-link">Fantasi Ilmiah & Fantasi</a></li>
                <li><a href="#" className="footer-mobile-link">Anime</a></li>
                <li><a href="#" className="footer-mobile-link">Kejahatan</a></li>
                <li><a href="#" className="footer-mobile-link">Britania</a></li>
                <li><a href="#" className="footer-mobile-link">KDrama</a></li>
                <li><a href="#" className="footer-mobile-link">Komedi</a></li>
                <li><a href="#" className="footer-mobile-link">Sains & Alam</a></li>
                <li><a href="#" className="footer-mobile-link">Petualangan</a></li>
                <li><a href="#" className="footer-mobile-link">Thriller</a></li>
                <li><a href="#" className="footer-mobile-link">Perang</a></li>
                <li><a href="#" className="footer-mobile-link">Romantis</a></li>
              </ul>
            </FooterAccordion>
            <FooterAccordion title="Bantuan">
              <ul>
                <li><a href="#" className="footer-mobile-link">FAQ</a></li>
                <li><a href="#" className="footer-mobile-link">Kontak Kami</a></li>
                <li><a href="#" className="footer-mobile-link">Privasi</a></li>
                <li><a href="#" className="footer-mobile-link">Syarat & Ketentuan</a></li>
              </ul>
            </FooterAccordion>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
