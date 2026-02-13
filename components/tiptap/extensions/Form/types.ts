// Base form type
interface BaseForm {
  id: string;
  prompt: string;
  type: string;
  image: string;
}

interface User {
  id: number;
  name: string | null;
  surname: string | null;
}

// Short answer form
export type ShortForm = BaseForm & {
  type: "short";
  answer?: string;
  answers?: { answer: string; user: User }[];
};

// Paragraph (long answer) form
export type ParagraphForm = BaseForm & {
  type: "paragraph";
  answer?: string;
  answers?: { answer: string; user: User }[];
};

// Single choice form
export type SingleForm = BaseForm & {
  type: "single";
  options: {
    optionId: string;
    text: string;
    image: string;
    other?: boolean;
  }[];
  answer?: {
    optionId: string;
    text?: string;
  }[];
  answers?: { answer: { optionId: string; text?: string }[]; user: User }[];
};

// Multiple choice form
export type MultipleForm = BaseForm & {
  type: "multiple";
  options: {
    optionId: string;
    text: string;
    image: string;
    other?: boolean;
  }[];
  answer?: {
    optionId: string;
    text?: string;
  }[];
  answers?: { answer: { optionId: string; text?: string }[]; user: User }[];
};

// Date form
export type DateForm = BaseForm & {
  type: "date";
  answer?: string;
  answers?: { answer: string; user: User }[];
};

// Time form
export type TimeForm = BaseForm & {
  type: "time";
  answer?: string;
  answers?: { answer: string; user: User }[];
};

// Linear scale form
export type LinearForm = BaseForm & {
  type: "linear";
  start: string;
  end: string;
  startText?: string;
  endText?: string;
  answer?: string;
  answers?: { answer: string; user: User }[];
};

// MultiGrid form
export type MultiGridForm = BaseForm & {
  type: "multigrid";
  rows: {
    rowId: string;
    text: string;
  }[];
  columns: {
    columnId: string;
    text: string;
  }[];
  answer?: {
    rowId: string;
    columnId: string;
  }[];
  answers?: { answer: { rowId: string; columnId: string }[]; user: User }[];
};

// MultiGridCheck form
export type MultiGridCheckForm = BaseForm & {
  type: "multigridcheck";
  rows: {
    rowId: string;
    text: string;
  }[];
  columns: {
    columnId: string;
    text: string;
  }[];
  answer?: {
    rowId: string;
    columnId: string;
  }[];
  answers?: { answer: { rowId: string; columnId: string }[]; user: User }[];
};

// Union type for all form types
export type FormItem =
  | ShortForm
  | ParagraphForm
  | SingleForm
  | MultipleForm
  | DateForm
  | TimeForm
  | LinearForm
  | MultiGridForm
  | MultiGridCheckForm;

// Form attributes for the editor
export interface FormAttributes {
  uuid: string;
  form: FormItem[];
}

// Where FormAnswer can be one of these types depending on the form type:
export type FormAnswer =
  | string // for short, paragraph, date, time forms
  | { optionId: string; text?: string }[] // for single, multiple forms
  | { rowId: string; columnId: string }[]; // for multigrid, multigridcheck forms

export interface FormWithAnswers {
  uuid: string;
  answers: Array<{
    id: string;
    answer: FormAnswer;
  }>;
}
