export interface TAM {
    title: string,
    name: string,
    overview: string,
    backdrop_path: string,
    poster_path: string,
    release_date: string,
    first_air_date: string,
    id: number,
}
export interface upcomingItemProps {
    movie: TAM,
    nextSlide: TAM,
    next: () => void
}

export interface upcomingState {
    upcoming: null | TAM[],
    fetchUpcoming: () => void
}

export interface popularState {
    popularMovies: null | TAM[],
    popularTvs: null | TAM[],
    fetchPopular: (type:string, currentPage:number) => void
}
