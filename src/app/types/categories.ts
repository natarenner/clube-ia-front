export const Categories = {
  Pharmacy: 'pharmacy',
  Market: 'market',
  Restaurant: 'restaurant'
};

export type Categories = (typeof Categories)[keyof typeof Categories];
