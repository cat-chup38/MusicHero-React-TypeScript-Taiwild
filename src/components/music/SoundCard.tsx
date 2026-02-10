import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addSongToPlaylist } from '../../store/slices/playlist.slice';
import type { Song } from '../../types/music.type';

export const SongCard = ({ song }: { song: Song }) => {
    const dispatch = useAppDispatch();
    const playlists = useAppSelector(state => state.playlists.lists);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <img src={song.artworkUrl100} className="w-full h-40 object-cover rounded-lg mb-3" />
            <div className="flex-grow">
                <h3 className="font-bold truncate">{song.trackName}</h3>
                <p className="text-sm text-gray-500">{song.artistName}</p>
            </div>

            {/* Selector de Playlist */}
            <select
                onChange={(e) => {
                    if (e.target.value) {
                        dispatch(addSongToPlaylist({ playlistId: e.target.value, song }));
                        alert("¡Añadida!");
                    }
                }}
                className="mt-3 text-xs p-2 border rounded bg-gray-50 outline-none"
            >
                <option value="">Añadir a lista...</option>
                {playlists.map(pl => (
                    <option key={pl.id} value={pl.id}>{pl.name}</option>
                ))}
            </select>
        </div>
    );
};