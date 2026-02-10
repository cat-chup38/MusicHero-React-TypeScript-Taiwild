export interface Song {
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string; // Nombre del álbum
    artworkUrl100: string;  // Imagen de portada
    previewUrl: string;     // URL para escuchar un fragmento
}

export interface iTunesResponse {
    resultCount: number;
    results: Song[];
}