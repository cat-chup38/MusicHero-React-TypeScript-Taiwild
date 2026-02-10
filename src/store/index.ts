import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './slices/music.slice'
import playlistReducer from './slices/playlist.slice';

export const store = configureStore({
    reducer: {
        music: musicReducer,
        playlists: playlistReducer,
    },
});

// Estos tipos son los que usamos en src/store/hooks.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;