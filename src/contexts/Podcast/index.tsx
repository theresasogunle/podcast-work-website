import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import type { Month, Speaker, NormalizedPodcast, Year } from "~/interfaces";
import * as selectors from "./selectors";
import * as mutations from "./mutations";

export type State = NormalizedPodcast[];

export interface ContextState {
  podcasts: NormalizedPodcast[];
  toggleSelectedPodcast: () => void;
  togglePodcastByDay: (day: Date) => void;
  updateSelectedPodcastAsPlayed: () => void;
}

export const Context = createContext({} as ContextState);

export const PodcastContextProvider: React.FC = ({ children }) => {
  const podcasts = useInitialPodcastData();

  const [state, setData] = useState<State>(podcasts);

  const togglePodcastByDay = useCallback((day: Date) => setData(mutations.togglePodcastByDay(state, day)), [state]);

  const toggleSelectedPodcast = useCallback(() => setData(mutations.toggleSelectedPodcast), []);

  const updateSelectedPodcastAsPlayed = useCallback(() => setData(mutations.updateSelectedPodcastAsPlayed), []);

  const updatePodcastList = useCallback(() => setData(mutations.updatePodcastList), []);

  useEffect(() => {
    updatePodcastList();
  }, [updatePodcastList]);

  return (
    <Context.Provider
      value={{
        podcasts: state,
        toggleSelectedPodcast,
        togglePodcastByDay,
        updateSelectedPodcastAsPlayed,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePodcastContext = () => {
  return useContext(Context);
};

export const useSelectedPodcast = () => {
  const context = useContext(Context);
  return selectors.getSelectedPodcast(context.podcasts);
};

export const usePodcastByDay = (day: Date) => {
  const context = useContext(Context);
  return selectors.getPodcastByDay(context.podcasts, day);
};

export const usePrevPodcast = () => {
  const context = useContext(Context);
  return selectors.getPreviousPodcast(context.podcasts);
};

export const useNextPodcast = () => {
  const context = useContext(Context);
  return selectors.getNextPodcast(context.podcasts);
};

export const usePodcasts = () => {
  const context = useContext(Context);
  return selectors.getPodcasts(context.podcasts);
};

export const usePlayingPodcast = () => {
  const context = useContext(Context);
  return selectors.getPlayingPodcast(context.podcasts);
};

export const usePodcastsBySpeakerId = (id: string) => {
  const context = useContext(Context);
  return selectors.getPodcastsBySpeakerId(context.podcasts, id);
};

export const useInitialPodcastData = () => {
  const { t: tr_1942 } = useTranslation("1942");
  const { t: tr_1943 } = useTranslation("1943");
  const { t: tr_1944 } = useTranslation("1944");
  const { t: t_speakers } = useTranslation("speakers");

  const podcasts = useMemo(() => {
    const speakers: Speaker[] = t_speakers("items", { returnObjects: true });

    const getDaysFromYear = (year: Year) => {
      const translations = {
        "1942": tr_1942,
        "1943": tr_1943,
        "1944": tr_1944,
      };

      const fn = translations[year];
      const months = fn("months", { returnObjects: true }) as Month[];

      return (Array.isArray(months) ? months : [])
        .map((month) =>
          month.days.map(
            (day): NormalizedPodcast => ({
              day: new Date(`${year}/${month.month}/${day.day}`),
              isSelected: false,
              src: day.podcast.src,
              state: "paused",
              speaker: {
                id: day.podcast.speakerId,
                name: speakers.find((speaker) => speaker.id === day.podcast.speakerId)?.name!,
              },
            })
          )
        )
        .flat();
    };

    const items = [getDaysFromYear("1942"), getDaysFromYear("1943"), getDaysFromYear("1944")]
      .flat()
      .sort((a, b) => a.day.getTime() - b.day.getTime());

    return items;
  }, [tr_1942, tr_1943, tr_1944, t_speakers]);

  return podcasts;
};
