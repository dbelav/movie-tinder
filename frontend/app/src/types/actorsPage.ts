type FieldNumber = number | null;
type FildString = string | null;

export interface Actor {
  _id?: string;
  nconst: string;
  primaryName: string;
  birthYear: FieldNumber;
  deathYear: FieldNumber;
  primaryProfession: FildString;
  knownForTitles: FildString;
}

export interface ActorInfoResponce {
  results: Actor;
}

export interface ActorsApiResponse {
  page: number;
  next: string;
  entries: number;
  results: Actor[];
}
