import Cookies from "js-cookie";
import type { State } from "./";

const prevIndex = (index: number, length: number, limit = false) => (index > 0 ? index - 1 : limit ? 0 : length - 1);

const nextIndex = (index: number, length: number, limit = false) =>
  index < length - 1 ? index + 1 : limit ? length - 1 : 0;

export const getPodcastByDay = (state: State, day: Date) => {
  return state.find((podcast) => podcast.day.getTime() === day.getTime())!;
};

export const getSelectedPodcastIndex = (state: State) => state.findIndex((podcast) => podcast.isSelected);

export const getSelectedPodcast = (state: State) => {
  return state.find((podcast) => podcast.isSelected);
};

export const getPreviousPodcast = (state: State) => {
  const index = getSelectedPodcastIndex(state);
  if (typeof index !== "undefined") {
    return state[prevIndex(index, state.length)];
  }
};

export const getNextPodcast = (state: State) => {
  const index = getSelectedPodcastIndex(state);
  if (typeof index !== "undefined") {
    return state[nextIndex(index, state.length)];
  }
};

export const getPodcasts = (state: State) => {
  return state;
};

export const storePlayedPodcasts = (state: State) => {
  const playedPodcasts = state.filter((podcast) => podcast.state === "played").map((podcast) => podcast.day);
  Cookies.set("podcasts", JSON.stringify(playedPodcasts));
};

export const getStoredPlayedPodcasts = (): string[] => {
  const podcasts = Cookies.get("podcasts");
  if (podcasts) return JSON.parse(podcasts);
  return [];
};

export const getPlayedPodcast = (day: Date) => {
  return getStoredPlayedPodcasts().find((playedPodcast: string) => new Date(playedPodcast).getTime() === day.getTime());
};

export const getPodcastsBySpeakerId = (state: State, id: string) => {
  return state.filter((podcast) => podcast.speaker.id === id);
};

export const getPlayingPodcast = (state: State) => {
  const playingPodcast = state.find((podcast) => podcast.state === "playing");
  if (playingPodcast) return true;
  return false;
};
