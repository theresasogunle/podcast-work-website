import * as selectors from "./selectors";
import type { State } from ".";

export const togglePodcastByDay = (state: State, day: Date): State => {
  return state.map((podcast) => {
    const podcastPlayed = selectors.getPlayedPodcast(podcast.day);
    return podcast.day.getTime() === day.getTime()
      ? {
          ...podcast,
          isSelected: true,
          state: podcast.state === "playing" ? (podcastPlayed ? "played" : "paused") : "playing",
        }
      : {
          ...podcast,
          isSelected: false,
          state: podcastPlayed ? "played" : "paused",
        };
  });
};

export const toggleSelectedPodcast = (state: State): State => {
  const podcast = selectors.getSelectedPodcast(state);

  if (podcast) {
    return togglePodcastByDay(state, podcast.day);
  }

  return state;
};

export const updateSelectedPodcastAsPlayed = (state: State): State => {
  const selectedPodcast = selectors.getSelectedPodcast(state);

  if (selectedPodcast) {
    const updatedState: State = state.map((podcast) =>
      selectedPodcast.day.getTime() === podcast.day.getTime()
        ? {
            ...podcast,
            state: "played",
          }
        : {
            ...podcast,
          }
    );
    selectors.storePlayedPodcasts(updatedState);

    return updatedState;
  }

  return state;
};

export const updatePodcastList = (state: State): State => {
  return state.map((podcast) =>
    selectors.getPlayedPodcast(podcast.day)
      ? {
          ...podcast,
          state: "played",
        }
      : {
          ...podcast,
          state: "paused",
        }
  );
};
