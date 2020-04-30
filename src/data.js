import { civilizations } from './data/civilizations.json';
import { maps } from './data/maps.json';

export const Civs = {};
export const CivsByName = {};

civilizations.forEach((civ) => (Civs[civ.id] = civ));
civilizations.forEach((civ) => (CivsByName[civ.name] = civ));

export const Maps = {};
export const MapsByName = {};

maps.forEach((m) => (Maps[m.id] = m));
maps.forEach((m) => (MapsByName[m.name] = m));
