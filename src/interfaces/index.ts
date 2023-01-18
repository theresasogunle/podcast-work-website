export type BaseColor = "white" | "black" | "red";

export type WaveBackgroundColor = BaseColor | "transparent";

export type WaveColor = "white" | "black";

export type PodcastState = "playing" | "paused" | "played";

export type Year = "1942" | "1943" | "1944";

export interface NormalizedPodcast {
  day: Date;
  src: string;
  isSelected: boolean;
  state: PodcastState;
  speaker: {
    id: string;
    name: string;
  };
}
interface Day {
  day: number;
  podcast: Podcast;
}
interface Podcast {
  src: string;
  speakerId: string;
}

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Cover extends Image {
  bounds: Bounds;
}

export interface Month {
  title: string;
  description: string;
  month: number;
  cover: Cover;
  days: Day[];
}

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  image: Image;
}

export interface MonthView extends Omit<Month, "days"> {
  backgroundColor: BaseColor;
  year: Year;
  days: number[];
}
