import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAlbumDetails } from '../api/music.api';
import type { Song } from '../types/music.type';


export const AlbumDetailPage = () => {
    // extraemos 'id' de la URL. TypeScript infiere que puede ser string o undefined.
    const { id } = useParams<{ id: string }>();
    const [albumData, setAlbumData] = useState<any>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                const data = await getAlbumDetails(id);
                // En iTunes lookup, el primer resultado es el álbum y los demás las canciones
                setAlbumData(data.results[0]);
                setSongs(data.results.slice(1));
            } catch (error) {
                console.error("Error cargando detalles", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]); // Si el ID en la URL cambia, el efecto se vuelve a ejecutar

    if (loading) return <div className="p-10 text-center">Cargando detalles del álbum...</div>;

    return (
        <div className="container mx-auto p-6">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
                ← Volver a la búsqueda
            </Link>

            {albumData && (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img
                        src={albumData.artworkUrl100.replace('100x100', '600x600')}
                        alt={albumData.collectionName}
                        className="w-full md:w-80 rounded-2xl shadow-2xl"
                    />

                    <div className="flex-grow">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">
                            {albumData.collectionName}
                        </h1>
                        <h2 className="text-2xl text-gray-600 mb-4">{albumData.artistName}</h2>
                        <p className="text-sm text-gray-400 uppercase tracking-widest">
                            {albumData.primaryGenreName} • {new Date(albumData.releaseDate).getFullYear()}
                        </p>

                        <div className="mt-8 space-y-2">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Lista de canciones</h3>
                            {songs.map((song, index) => (
                                <div
                                    key={song.trackId}
                                    className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-400 w-4">{index + 1}</span>
                                        <span className="font-medium">{song.trackName}</span>
                                    </div>
                                    <audio src={song.previewUrl} controls className="h-8 opacity-50 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};