import { Outlet, Link } from 'react-router-dom';


export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar persistente */}
            <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600 italic">MusicHero</Link>
                <div className="flex gap-6 font-medium">
                    <Link to="/" className="hover:text-blue-500 transition-colors">Búsqueda</Link>
                    <Link to="/create-playlist" className="hover:text-blue-500 transition-colors">Nueva Playlist</Link>
                </div>
                </div>
            </nav>

            <main>
                {/* El Outlet es un componente especial de react-router-dom.
                    Sirve como un "placeholder" donde se renderizará la página actual
                    basada en la URL. */}
                <Outlet />
            </main>
        </div>
    );
};