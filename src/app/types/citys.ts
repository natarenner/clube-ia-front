export const Citys = {
  RJ: 'rj',
  Santos: 'santos',
  Chapeco: 'chapeco',
  JaraguaSul: 'jaragua-sul',
  CaxiasSul: 'caxias-do-sul',
  TaboaoSerra: 'taboao-da-serra',
  Carapicuiba: 'carapicuiba',
  Osasco: 'osasco',
  SPZonaSul: 'sp-zs',
  SPZonaOeste: 'sp-zo',
  SPZonaLeste: 'sp-zl',
  SPZonaNorte: 'sp-zn',
  Goiania: 'goiania',
  Itanhaem: 'itanhaem'
};

export type Citys = (typeof Citys)[keyof typeof Citys];
