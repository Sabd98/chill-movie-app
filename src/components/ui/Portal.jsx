import { createPortal } from 'react-dom';
import { useState, useLayoutEffect } from 'react';

const Portal = ({ children, className = '' }) => {
  const [container, setContainer] = useState(null);

  useLayoutEffect(() => {
    const id = 'portal-root';
    let element = document.getElementById(id);
    
    if (!element) {
      element = document.createElement('div');
      element.id = id;
      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '100%';
      element.style.height = '100%'; 
      element.style.pointerEvents = 'none'; 
      element.style.overflow = 'visible';
      element.style.zIndex = '9999'; 
      document.body.appendChild(element);
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContainer(element);
  }, []);

  if (!container) return null;

  return createPortal(
    <div className={className} style={{ position: 'relative', zIndex: 'auto' }}>
      {children}
    </div>, 
    container
  );
};

export default Portal;
