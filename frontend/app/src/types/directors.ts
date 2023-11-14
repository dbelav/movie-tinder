interface JobCreditAttribute {
  text: string;
  __typename: string;
}

interface NameText {
  text: string;
  __typename: string;
}

interface Name {
  id: string;
  nameText: NameText;
  __typename: string;
}

interface Crew {
  name: Name;
  attributes: JobCreditAttribute[] | null;
  __typename: string;
}

export interface DirectorCategory {
  totalCredits: number;
  category: {
    text: string;
    __typename: string;
  };
  credits: Crew[];
  __typename: string;
}

interface CreditCategory {
  text: string;
  __typename: string;
}

interface Writer {
  totalCredits: number;
  category: CreditCategory;
  credits: Crew[];
  __typename: string;
}

interface Results {
  _id: string;
  id: string;
  creators: any[];
  directors: DirectorCategory[];
  writers: Writer[];
}

export interface Directors {
  results: Results;
}
