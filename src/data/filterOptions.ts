import { GENRES } from './genres';
import { TAGS } from './tags';

export const genreOptions = GENRES.map((genre) => ({
  value: genre,
  label: genre,
}));

export const tagOptions = TAGS.map((tag) => ({
  value: tag,
  label: tag,
}));

export const seasonOptions = [
  { value: 'WINTER', label: 'Winter' },
  { value: 'SPRING', label: 'Spring' },
  { value: 'SUMMER', label: 'Summer' },
  { value: 'FALL', label: 'Fall' },
];

export const formatOptions = [
  { value: 'TV', label: 'TV' },
  { value: 'TV_SHORT', label: 'TV Short' },
  { value: 'MOVIE', label: 'Movie' },
  { value: 'SPECIAL', label: 'Special' },
  { value: 'OVA', label: 'OVA' },
  { value: 'ONA', label: 'ONA' },
  { value: 'MUSIC', label: 'Music' },
];

export const airingStatusOptions = [
  { value: 'FINISHED', label: 'Finished' },
  { value: 'RELEASING', label: 'Releasing' },
  { value: 'NOT_YET_RELEASED', label: 'Not Yet Released' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'HIATUS', label: 'Hiatus' },
];

const currentYear = new Date().getFullYear();
export const yearOptions = Array.from(
  { length: currentYear - 1940 + 1 },
  (_, i) => {
    const year = currentYear - i;
    return { value: String(year), label: String(year) };
  }
);
