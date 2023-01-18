import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { Year } from "~/interfaces";

interface State {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setYear: Dispatch<SetStateAction<Year | undefined>>;
  year: Year | undefined;
}

const Context = createContext({} as State);

export const StickyYearContextProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [year, setYear] = useState<Year>();

  return (
    <Context.Provider
      value={{
        show,
        setShow,
        setYear,
        year,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStickyYearContext = () => {
  return useContext(Context);
};
