export interface Topic {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Control Structures' | 'Data Structures' | 'The DOM';
  content: string;
  exampleCode: string;
  pitfalls: string[];
  pseudoCode?: string;
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  completedTopics: string[];
}
