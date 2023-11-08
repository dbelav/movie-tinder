export interface IMovie {
  id: number;
  title: string;
  year: string;
  poster_url: string;
  rating: number;
  genres: {
    name: string;
    slug: string;
  }[];
}