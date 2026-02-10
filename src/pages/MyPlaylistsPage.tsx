import { useAppSelector } from '../store/hooks';


export const MyPlaylistsPage = () => {
    const playlists = useAppSelector(state => state.playlists.lists);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Tus Playlists</h1>

            {playlists.length === 0 ? (
                <p className="text-gray-500">No has creado listas todavía.</p>
            ) : (
                <div className="space-y-8">
                    {playlists.map(pl => (
                        <section key={pl.id} className="bg-white p-6 rounded-2xl shadow-sm border">
                            <h2 className="text-2xl font-bold text-blue-600">{pl.name}</h2>
                            <p className="text-gray-600 mb-4">{pl.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {pl.songs.map(song => (
                                    <div key={song.trackId} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                        <img src={song.artworkUrl100} className="w-12 h-12 rounded" />
                                        <div>
                                            <p className="text-sm font-semibold">{song.trackName}</p>
                                            <p className="text-xs text-gray-500">{song.artistName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};