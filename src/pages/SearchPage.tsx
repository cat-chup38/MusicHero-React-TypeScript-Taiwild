import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSongs, setLoading } from '../store/slices/music.slice';
import { searchSongs } from '../api/music.api';
import { Input } from '../components/ui/Input';
import { SongCard } from '../components/music/SoundCard';
import { useDebounce } from '../hooks/useDebounce';


export const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('Linkin Park');
    const debouncedSearch = useDebounce(searchTerm, 500); // 500ms de espera
    const dispatch = useAppDispatch();
    const { searchResults, loading } = useAppSelector((state) => state.music);

    // Este efecto solo se dispara cuando el valor "debounced" cambia
    useEffect(() => {
        const fetchMusic = async () => {
            if (!debouncedSearch) return;

            dispatch(setLoading(true));
            try {
                const data = await searchSongs(debouncedSearch);
                dispatch(setSongs(data.results));
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchMusic();
    }, [debouncedSearch, dispatch]);

    return (
        <div className="container mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Descubre Música</h1>
                <div className="max-w-md">
                    <Input 
                        placeholder="Escribe un artista o canción..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <p className="text-xs text-gray-400 mt-2">Buscando automáticamente mientras escribes...</p>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
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