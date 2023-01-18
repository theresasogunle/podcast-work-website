import { useEffect, useState } from "react";
import { isIosDevice, debounce } from "~/utils/common";

export const useWindowSize = () => {
  const [{ width, height }, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let windowWidth = window.innerWidth;

    const handleResize = () => {
      if (isIosDevice()) {
        if (windowWidth !== window.innerWidth) {
          // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
          windowWidth = window.innerWidth;
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  return {
    width,
    height,
  };
};
