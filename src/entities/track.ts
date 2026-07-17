export interface Track {
  id: string
  title: string
  artist: string
  cover?: string
  src: string
  duration: number
}

export interface Playlist {
  id: string
  title: string
  tracks: Track[]
}
