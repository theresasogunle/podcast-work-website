export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const isAnalyzing = process.env.ANALYZE === "true";
export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const isIosDevice = () => {
  if (isServer) return false;

  return (
    window.navigator &&
    window.navigator.platform &&
    (/iP(ad|hone|od)/.test(window.navigator.platform) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1))
  );
};

export const formatDate = (
  date: Date,
  locale: string = "en",
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => new Intl.DateTimeFormat(locale, options).format(date);

export const getIdByDate = (date?: Date) => {
  if (!date) return;

  return new Intl.DateTimeFormat("en-CA", { month: "2-digit", day: "2-digit", year: "numeric" })
    .format(date)
    .replace(/\b0/g, "")
    .replaceAll("-", "/");
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

export const map = (value: number, [a, b]: [number, number], [min, max]: [number, number], shouldClamp?: boolean) => {
  const mappedResult = ((value - a) * (max - min)) / (b - a) + min;
  return shouldClamp ? clamp(mappedResult, min, max) : mappedResult;
};
