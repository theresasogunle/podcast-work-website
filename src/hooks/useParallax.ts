import { useEffect, MutableRefObject, useCallback, useState, useRef } from "react";
import { ScrollListener, ScrollbarPlugin } from "smooth-scrollbar/interfaces";
import { map, debounce } from "~/utils/common";
import { useSmoothScrollbarContext } from "~/contexts/SmoothScrollbar";

type ScrollDirection = "horizontal" | "vertical";

interface Props {
  imageContainerRef: MutableRefObject<HTMLElement | null>;
  imageRef: MutableRefObject<HTMLElement | null>;
  overflow: number;
}

export const useParallax = ({ imageContainerRef, imageRef, overflow }: Props) => {
  const { scrollbar } = useSmoothScrollbarContext();
  const [direction, setDirection] = useState<ScrollDirection | undefined>();

  const bounds = useRef({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // onScroll handler
  const onScroll = useCallback(
    (position: number) => {
      if (!imageRef.current || !imageContainerRef.current || !direction) return;

      const computedOverflow =
        direction === "horizontal" ? bounds.current.width * overflow : bounds.current.height * overflow;

      const maxValue = computedOverflow;
      const minValue = -maxValue;

      if (direction === "horizontal") {
        const pos = map(
          bounds.current.left - position,
          [window.innerWidth, -bounds.current.width],
          [minValue, maxValue]
        );

        imageRef.current.style.setProperty("transform", `translate3d(${pos}px, 0px, 0px)`);
      }

      if (direction === "vertical") {
        const pos = map(
          bounds.current.top - position,
          [window.innerHeight, -bounds.current.height],
          [minValue, maxValue]
        );

        imageRef.current.style.setProperty("transform", `translate3d(0px, ${pos}px, 0px)`);
      }
    },
    [imageContainerRef, imageRef, overflow, direction, bounds]
  );

  // Resize listener and set initial style on the image
  const onResize = useCallback(() => {
    if (!scrollbar || !direction || !imageContainerRef.current || !imageRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();

    bounds.current = {
      left: left + scrollbar.offset.x,
      top: top + scrollbar.offset.y,
      width,
      height,
    };

    const computedOverflow =
      direction === "horizontal" ? bounds.current.width * overflow : bounds.current.height * overflow;

    if (direction === "horizontal") {
      imageRef.current.style.setProperty("width", `calc(100% + (2 * ${computedOverflow}px))`);
      imageRef.current.style.setProperty("left", `${-computedOverflow}px`);
    }

    if (direction === "vertical") {
      imageRef.current.style.setProperty("height", `calc(100% + (2 * ${computedOverflow}px))`);
      imageRef.current.style.setProperty("top", `${-computedOverflow}px`);
    }
  }, [scrollbar, imageContainerRef, imageRef, direction, overflow]);

  // Set scroll direction
  useEffect(() => {
    if (!scrollbar) return;

    const isHorizontal = (scrollbar["_plugins"] as ScrollbarPlugin[]).find(
      (plugin) => plugin.name === "horizontalScroll"
    )?.options?.active;

    setDirection(isHorizontal ? "horizontal" : "vertical");
  }, [scrollbar]);

  // Attach "scroll" listener and resize listener
  useEffect(() => {
    if (!scrollbar || !direction || !imageContainerRef.current) return;

    const startingPosition = direction === "horizontal" ? scrollbar.offset.x : scrollbar.offset.y;

    onResize();

    onScroll(startingPosition);

    const listener: ScrollListener = (ev) => {
      const position = direction === "horizontal" ? ev.offset.x : ev.offset.y;
      onScroll(position);
    };

    scrollbar.addListener(listener);

    const debouncedResize = debounce(onResize, 100);

    window.addEventListener("resize", debouncedResize);

    return () => {
      scrollbar.removeListener(listener);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [onScroll, onResize, scrollbar, direction, imageContainerRef]);
};
