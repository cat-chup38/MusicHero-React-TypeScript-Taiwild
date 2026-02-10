import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSongs, setLoading } from '../store/slices/music.slice';
import { searchSongs } from '../api/music.api';
import { Input } from '../components/ui/Input';
import { SongCard } from '../components/music/SoundCard';


export const SearchPage = () => {
    const [query, setQuery] = useState('Linkin Park'); // Valor inicial
    const dispatch = useAppDispatch();
    // Extraemos datos del store global
    const { searchResults, loading } = useAppSelector((state) => state.music);

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm) return;

        dispatch(setLoading(true));
        try {
            const data = await searchSongs(searchTerm);
            dispatch(setSongs(data.results));
        } catch (error) {
            console.error("Error buscando música", error);
        } finally {
            dispatch(setLoading(false));
        }
  };

  // useEffect: Se ejecuta cada vez que el componente se monta
  // o cuando cambian las dependencias en el array [].
  useEffect(() => {
        handleSearch(query);
  }, []);

  return (
        <div className="container mx-auto p-6">
        <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Busca tu música</h1>
            <div className="flex gap-2 max-w-md">
            <Input
                placeholder="Artista, canción..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                onClick={() => handleSearch(query)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
                Buscar
            </button>
            </div>
        </header>

        {loading ? (
            <p className="text-center text-xl">Cargando hits...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((song) => (
                <SongCard key={song.trackId} song={song} />
            ))}
            </div>
        )}
        </div>
    );
};