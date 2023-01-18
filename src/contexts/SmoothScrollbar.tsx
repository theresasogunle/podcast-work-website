import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import SmoothScrollbar from "smooth-scrollbar";

interface State {
  scrollbar: SmoothScrollbar | undefined;
  setScrollbar: Dispatch<SetStateAction<SmoothScrollbar | undefined>>;
}

const Context = createContext({} as State);

export const SmoothScrollbarContextProvider: React.FC = ({ children }) => {
  const [scrollbar, setScrollbar] = useState<SmoothScrollbar | undefined>();

  return (
    <Context.Provider
      value={{
        scrollbar,
        setScrollbar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSmoothScrollbarContext = () => {
  return useContext(Context);
};
