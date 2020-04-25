import { civilizations } from './data/civilizations.json';

export const Civs = {};

civilizations.forEach((civ) => (Civs[civ.id] = civ));
