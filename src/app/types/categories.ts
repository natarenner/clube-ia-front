export const Categories = {
  Food: 'food',
  Drinks: 'drinks',
  Commerce: 'commerce',
  Pharmacy: 'pharmacy',
  Market: 'market',
  PetShop: 'pet_shop',
  Services: 'services'
};

export const enum PromptType {
  System = 'system',
  Food = 'food',
  Drinks = 'drinks',
  Commerce = 'commerce',
  Pharmacy = 'pharmacy',
  Market = 'market',
  PetShop = 'pet_shop',
  Services = 'services'
}

export type Categories = (typeof Categories)[keyof typeof Categories];
