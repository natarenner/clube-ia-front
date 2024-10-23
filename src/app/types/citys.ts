export const Citys = {
  SP: 'sp',
  RJ: 'rj',
  Santos: 'santos'
};

export type Citys = (typeof Citys)[keyof typeof Citys];
