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

export interface ITest {
  item: ITestOptions;
  id: string;
}

export type Data = ITest[];
