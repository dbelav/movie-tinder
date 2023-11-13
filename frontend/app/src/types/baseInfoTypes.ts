import {
  Image,
  TitleType,
  TitleText,
  YearRange,
  ReleaseDate,
  IMovie,
} from "./miniInfoTypes";

interface RatingsSummary {
  aggregateRating: number;
  voteCount: number;
  __typename: string;
}

interface TitleTypeBase extends TitleType {
  categories: { value: string; __typename: string }[];
  canHaveEpisodes: boolean;
}

export interface Genre {
  text: string;
  id: string;
  __typename: string;
}

interface Genres {
  genres: Genre[];
  __typename: string;
}

interface Runtime {
  seconds: number;
  __typename: string;
}

interface MeterRankChange {
  changeDirection: string;
  difference: number;
  __typename: string;
}

interface TitleMeterRanking {
  currentRank: number;
  rankChange: MeterRankChange;
  __typename: string;
}

interface DisplayableLanguage {
  id: string;
  __typename: string;
}

interface PlotText {
  plainText: string;
  __typename: string;
}

interface Plot {
  plotText: PlotText;
  language: DisplayableLanguage;
  __typename: string;
}

export interface ImovieBase extends IMovie {
  _id: string;
  id: string;
  ratingsSummary: RatingsSummary;
  episodes: null;
  titleType: TitleTypeBase;
  genres: Genres;
  runtime: Runtime;
  series: null;
  meterRanking: TitleMeterRanking;
  plot: Plot;
}
export interface ApiResponsBase {
  results: ImovieBase;
}
