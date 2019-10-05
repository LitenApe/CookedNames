export type ArgumentTypes = string | number | dict | array | undefined | null;

export interface dict {
  [id: string]: boolean | undefined | null;
}

export interface array extends Array<ArgumentTypes> {};

interface CookedNamesFn {
  (...classes: ArgumentTypes[]): string
}

declare let cookedNames: CookedNamesFn;

export default cookedNames;
