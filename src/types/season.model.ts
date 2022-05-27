export interface Season {
  [episodeDate: string]: Episode;
}

export interface Episode {
  [round: string]: Category;
}

export interface Category {
  [category: string]: Question[];
}

export interface Question {
  value: number;
  isDailyDouble: boolean;
  question: string;
  answer: string;
}
