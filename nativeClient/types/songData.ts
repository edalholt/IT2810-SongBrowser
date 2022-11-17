import { SortBy, SortTypes } from "../enums/order";

export type getSongsInputs = {
  search?: string;
  page: number;
  pageSize?: number;
  orderBy?: { [key in SortBy]?: SortTypes };
  uid?: string | null;
};

export type songsType = {
  songs: songType[];
  page: number;
  totalPages: number;
};

export type songType = {
  _id: string;
  name: string;
  artists: string[];
  danceability: number;
  year: number;
  explicit: boolean;
  duration_ms: number;
  popularity: number;
  rating: number | null;
  isLiked: boolean | null;
};

export type songsDataType = {
  getSongs: songsType;
};
