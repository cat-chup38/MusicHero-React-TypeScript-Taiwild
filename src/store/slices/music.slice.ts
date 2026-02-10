import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '../../types/music.type';


interface MusicState {
    searchResults: Song[];
    loading: boolean;
}

const initialState: MusicState = {
    searchResults: [],
    loading: false,
};

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        // Definimos acciones para actualizar el estado
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.searchResults = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
    });

export const { setSongs, setLoading } = musicSlice.actions;
export default musicSlice.reducer;