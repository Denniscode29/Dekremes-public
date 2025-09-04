import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // tiap kali pindah path, scroll balik ke atas
  }, [pathname]);

  return null;
}

export default ScrollToTop;
