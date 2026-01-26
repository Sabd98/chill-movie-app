import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, Star, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import '../../styles/header.css';
import Portal from '../ui/Portal';

const Header = ({ onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleToggleDropdown = () => {
    if (!isDropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 3,
        right: document.documentElement.clientWidth - rect.right
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
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
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/home'); }}>
              Series
            </a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/home'); }}>
              Film
            </a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/my-list'); }}>
              Daftar Saya
            </a>
          </nav>
          <div className="relative">
            <div
              ref={triggerRef}
              className="flex items-center cursor-pointer px-2! py-2! rounded-[25px] bg-[#181a1ccd] transition-colors duration-300 hover:bg-[rgba(31,131,237,0.8)]"
              onClick={handleToggleDropdown}
            >
              <img
                src="/Ellipse 395.png"
                alt="Profile"
                className="w-[35px] h-[35px] rounded-full mr-2! bg-white"
              />
              <ChevronDown size={20} className="text-[1.2rem] text-white" />
            </div>
            {isDropdownOpen && (
              <Portal>
                <div 
                  ref={dropdownRef}
                  className="dropdown show"
                  style={{
                    position: 'fixed',
                    top: `${dropdownPos.top}px`,
                    right: `${dropdownPos.right}px`,
                    zIndex: 9999,
                    margin: 0
                  }}
                >
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/profile'); }}>
                    <User size={16} /> Profil Saya
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/subscription'); }}>
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
              </Portal>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
