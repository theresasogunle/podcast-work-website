import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import type { WaveBackgroundColor, WaveColor } from "~/interfaces";

interface State {
  waveBackgroundColor: WaveBackgroundColor;
  setWaveBackgroundColor: Dispatch<SetStateAction<WaveBackgroundColor>>;
  waveColor: WaveColor;
  setWaveColor: Dispatch<SetStateAction<WaveColor>>;
  addBorders: boolean;
  setAddBorders: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext({} as State);

export const WaveContextProvider: React.FC = ({ children }) => {
  const [waveBackgroundColor, setWaveBackgroundColor] = useState<WaveBackgroundColor>("white");
  const [waveColor, setWaveColor] = useState<WaveColor>("black");
  const [addBorders, setAddBorders] = useState(true);

  return (
    <Context.Provider
      value={{
        waveBackgroundColor,
        setWaveBackgroundColor,
        waveColor,
        setWaveColor,
        addBorders,
        setAddBorders,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useWaveContext = () => {
  return useContext(Context);
};
