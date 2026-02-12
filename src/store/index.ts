import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './slices/music.slice'
import playlistReducer from './slices/playlist.slice';
import { loadState, saveState } from '../utils/localStorage';


const persistedState = loadState();

export const store = configureStore({
    reducer: {
        music: musicReducer,
        playlists: playlistReducer,
    },
    preloadedState: {
        playlists: persistedState
    }
});

// store.subscribe se ejecuta cada vez que el estado cambia
store.subscribe(() => {
    saveState(store.getState().playlists);
});

// Estos tipos son los que usamos en src/store/hooks.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;