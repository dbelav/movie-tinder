interface NameText {
  text: string;
  __typename: string;
}

interface Image {
  url: string;
  width: number;
  height: number;
  __typename: string;
}

interface Name {
  id: string;
  nameText: NameText;
  primaryImage: Image | null;
  __typename: string;
}

interface Character {
  name: string;
  __typename: string;
}

interface EpisodeCastConnection {
  total: number;
  yearRange: any;
  __typename: string;
}

interface CastNode {
    name: Name;
    attributes: any; 
    characters: Character[];
    episodeCredits: EpisodeCastConnection;
    __typename: string;
}

export interface CreditEdge {
  node: CastNode;
  __typename: string;
}

interface Results {
  _id: string;
  id: string;
  cast: {
    edges: CreditEdge[];
    __typename: string;
  };
}

export interface Actors {
    results: Results;
}
