import { useEffect, useState } from "react";

export const usePropertyValue = (property: string) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const onResize = () => {
      const computedStyle = global.getComputedStyle(document.documentElement);
      let value: string | number = computedStyle.getPropertyValue(property);
      value = Number(value.match(/\d+/)?.[0]);

      setValue(value);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [property]);

  return value;
};
