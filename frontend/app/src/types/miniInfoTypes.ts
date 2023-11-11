export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: {
    plainText: string;
    __typename: string;
  };
  __typename: string;
}

export interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

export interface TitleText {
  text: string;
  __typename: string;
}

export interface YearRange {
  year: number;
  endYear: number | null;
  __typename: string;
}

export interface ReleaseDate {
  day: number | null;
  month: number | null;
  year: number;
  __typename: string;
}

export interface IMovie {
  _id: string;
  id: string;
  primaryImage: Image | null;
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: YearRange;
  releaseDate: ReleaseDate | null;
}

export interface ApiResponseMini {
  page: number;
  next: string;
  entries: number;
  results: IMovie[];
}
