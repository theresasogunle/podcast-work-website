import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface State {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext({} as State);

export const MenuContextProvider: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(Context);
};
