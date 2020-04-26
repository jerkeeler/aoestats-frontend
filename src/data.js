import { civilizations } from './data/civilizations.json';

export const Civs = {};
export const CivsByName = {};

civilizations.forEach((civ) => (Civs[civ.id] = civ));
civilizations.forEach((civ) => (CivsByName[civ.name] = civ));
