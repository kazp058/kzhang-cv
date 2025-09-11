import { useState, useEffect } from "react";

export default function useScrollIndicator(currentSection, delay = 2000) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [currentSection, delay]);

  return show;
}