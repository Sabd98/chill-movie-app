import { useState, useEffect } from "react";
import { ChevronDown, User, Star, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import '../styles/header.css';

const Header = ({ onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="nav">
          <nav className="flex items-center gap-20">
            <img
              src="/Logo.png"
              alt="Logo"
              className="flex items-center text-[1.8rem] font-bold"
            />
            <a href="#" className="nav-link">
              Series
            </a>
            <a href="#" className="nav-link">
              Film
            </a>
            <a href="#" className="nav-link">
              Daftar Saya
            </a>
          </nav>
          <div className="relative">
            <div
              className="flex items-center cursor-pointer px-2! py-2! rounded-[25px] bg-[#181a1ccd] transition-colors duration-300 hover:bg-[rgba(31,131,237,0.8)]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="/Ellipse 395.png"
                alt="Profile"
                className="w-[35px] h-[35px] rounded-full mr-2! bg-white"
              />
              <ChevronDown size={20} className="text-[1.2rem] text-white" />
            </div>
            {isDropdownOpen && (
              <div className="dropdown show">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <User size={16} /> Profil Saya
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <Star size={16} /> Ubah Premium
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                
                >
                  <LogOut size={16} /> Keluar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
