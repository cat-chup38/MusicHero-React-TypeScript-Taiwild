import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '../../types/music.type';

// Definimos cómo luce una Playlist dentro de nuestro sistema
export interface Playlist {
    id: string;
    name: string;
    description: string;
    songs: Song[];
}

interface PlaylistState {
    lists: Playlist[];
}

const initialState: PlaylistState = {
    lists: [],
};

export const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        // Acción para crear una lista nueva
        addPlaylist: (state, action: PayloadAction<Omit<Playlist, 'songs'>>) => {
            state.lists.push({
                ...action.payload,
                songs: [] // Inicializamos con una lista de canciones vacía
            });
        },
        // Acción para añadir una canción a una lista específica
        addSongToPlaylist: (state, action: PayloadAction<{ playlistId: string; song: Song }>) => {
            const { playlistId, song } = action.payload;

            // Buscamos la referencia de la playlist en el estado
            const playlist = state.lists.find(pl => pl.id === playlistId);

            if (playlist) {
                // Verificamos si la canción ya existe usando su trackId único
                const isDuplicate = playlist.songs.some(s => s.trackId === song.trackId);

                if (!isDuplicate) {
                    playlist.songs.push(song);
                } else {
                    // Podríamos manejar errores aquí, pero por ahora evitamos el duplicado
                    console.warn("La canción ya está en esta playlist");
                }
            }
        }
    }
});

export const { addPlaylist, addSongToPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;