import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useOffSetTopDistance() {
  const [offsetTop, setOffSetTop] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffSetTop(window.scrollY);
    };
    return () => {
      window.onscroll = null;
    };
  });

  return offsetTop;
}
