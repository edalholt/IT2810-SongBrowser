export type getSongsArgs = {
    page: number, 
    pageSize: number, 
    search: string, 
    year: number, 
    orderBy?: {
        year?: string, 
        popularity?: string, 
        danceability?: string, 
        duration_ms?: string
    } 
  };

export type searchQueryType = {
    $or: ({ 
        name: RegExp; } | { artists: RegExp; })[], 
        year?: number
    }

export type rateSongArgs = {
    _id: string, 
    rating: number | null
}