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
            const playlist = state.lists.find(pl => pl.id === action.playlistId);
            if (playlist) {
                // Verificamos que la canción no esté ya en la lista (evitar duplicados)
                const exists = playlist.songs.find(s => s.trackId === action.song.trackId);
                if (!exists) {
                    playlist.songs.push(action.song);
                }
            }
        }
    }
});

export const { addPlaylist, addSongToPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;