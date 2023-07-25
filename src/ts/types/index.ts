interface IQuestion {
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

export interface ITest {
  item: ITestOptions;
  id: string;
}

export type Data = ITest[];
