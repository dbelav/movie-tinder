interface Image {
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

interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

interface TitleText {
  text: string;
  __typename: string;
}

interface YearRange {
  year: number;
  endYear: number | null;
  __typename: string;
}

interface ReleaseDate {
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

export interface ApiResponse {
  page: number;
  next: string;
  entries: number;
  results: IMovie[];
}
