import { useEffect } from "react";
import { isIosDevice, debounce } from "~/utils/common";

const set100vh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export const real100vh = `calc(var(--vh, 1vh) * 100)`;

export const use100vh = () => {
  useEffect(() => {
    let windowWidth = window.innerWidth;

    const handleResize = () => {
      if (isIosDevice()) {
        if (windowWidth !== window.innerWidth) {
          // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
          windowWidth = window.innerWidth;
          set100vh();
        }
      } else set100vh();
    };

    set100vh();

    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);
};
