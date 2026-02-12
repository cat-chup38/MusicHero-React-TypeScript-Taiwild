import axios from 'axios';
import type { iTunesResponse } from '../types/music.type';


// Creamos una instancia de axios para no repetir la URL base
const api = axios.create({
    baseURL: 'https://itunes.apple.com',
});

export const searchSongs = async (term: string): Promise<iTunesResponse> => {
    // Realizamos un GET. iTunes requiere el parámetro 'term' y 'entity=song'
    const response = await api.get<iTunesResponse>(`/search?term=${term}&entity=song&limit=20`);
    return response.data;
};

export const getAlbumDetails = async (collectionId: string) => {
    // El parámetro 'entity=song' nos trae el álbum Y todas sus canciones
    const response = await axios.get(`https://itunes.apple.com/lookup?id=${collectionId}&entity=song`);
    return response.data;
};