import { useEffect, MutableRefObject } from "react";

interface Props {
  ref: MutableRefObject<HTMLDivElement | null>;
  callback?: () => void;
  skipAttribute?: string;
}

export const useOnClickOutside = ({ ref, callback, skipAttribute }: Props) => {
  useEffect(() => {
    if (!callback) return;

    const listener = (event: Event) => {
      if (
        ref.current?.contains(event.target as Element) ||
        (event.target as Element).hasAttribute(skipAttribute ?? "")
      ) {
        return;
      }
      callback();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback, skipAttribute]);
};
