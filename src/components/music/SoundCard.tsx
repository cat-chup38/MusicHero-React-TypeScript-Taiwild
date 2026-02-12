import React from 'react';
import type { Song } from '../../types/music.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSongToPlaylist } from '../../store/slices/playlist.slice';

interface SongCardProps {
    song: Song;
}

export const SongCard: React.FC<SongCardProps> = ({ song }) => {
    const dispatch = useAppDispatch();
    // Obtenemos las listas para llenar el selector
    const playlists = useAppSelector((state) => state.playlists.lists);

    const handleAddToPlaylist = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const playlistId = e.target.value;
        if (!playlistId) return;

        dispatch(addSongToPlaylist({ playlistId, song }));

        // Resetear el select después de añadir
        e.target.value = "";
        alert(`¡"${song.trackName}" añadida con éxito!`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col group transition-all hover:shadow-xl">
            {/* Contenedor de Imagen con efecto hover */}
            <div className="relative overflow-hidden aspect-square">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-50"
                    src={song.artworkUrl100.replace('100x100', '400x400')} // Truco técnico para mejor resolución
                    alt={song.trackName}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        ▶️
                    </button>
                </div>
            </div>

            {/* Información de la canción */}
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-gray-800 truncate mb-1" title={song.trackName}>
                    {song.trackName}
                </h3>
                <p className="text-sm text-gray-500 truncate mb-4">
                    {song.artistName}
                </p>

                {/* UI de Selección de Playlist */}
                <div className="mt-auto">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-1">
                        Añadir a...
                    </label>
                    <select
                        onChange={handleAddToPlaylist}
                        defaultValue=""
                        className="w-full text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                    >
                        <option value="" disabled>Seleccionar lista</option>
                        {playlists.length > 0 ? (
                            playlists.map(list => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No tienes listas aún</option>
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
};