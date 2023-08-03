export interface IQuestion {
  id: number;
  text: string;
  variants: string[];
  trueIndex: number;
}

interface ITestOptions {
  id: number;
  name: string;
  description: string;
  questions: IQuestion[];
}

export interface TestQuestion {
  questionText: string;
  questionValue: string | undefined;
  questionTrueValue: string;
}

interface ITestFormElem extends HTMLInputElement {}

export interface ITestFormElements {
  [key: string]: ITestFormElem;
}

export interface ITest {
  item: ITestOptions;
  id: string;
}

export type Data = ITest[];
