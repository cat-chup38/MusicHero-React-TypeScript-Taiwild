// Guardamos solo el estado de las playlists para no saturar el almacenamiento
export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('playlists', serializedState);
    } catch (err) {
        console.error("No se pudo guardar el estado", err);
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('playlists');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};