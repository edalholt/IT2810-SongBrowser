export type getSongsArgs = {
    page: number, 
    pageSize: number, 
    search: string, 
    year: number,
    uid: string, 
    orderBy?: {
        year?: string, 
        popularity?: string, 
        danceability?: string, 
        duration_ms?: string
    } 
  };

export type SongType = {
    _id: string
    name: string
    artists: string[]
    year: number
    energy: number
    popularity: number
    tempo: number
    duration_ms: number
    danceability: number
    explicit: boolean
    acousticness: number
    key: number
    rating?: number
    isLiked?: boolean
  }

export type searchQueryType = {
    $or: ({ 
        name: RegExp; } | { artists: RegExp; })[], 
        year?: number
    }

export type rateSongArgs = {
    _id: string, 
    rating: number | null
}