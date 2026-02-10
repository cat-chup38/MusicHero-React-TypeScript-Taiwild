import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { SearchPage } from './pages/SearchPage';
import { CreatePlaylistPage } from './pages/CreatePlaylistPage';
import { MyPlaylistsPage } from './pages/MyPlaylistsPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* El Layout envuelve a las demás rutas como "children" */}
                <Route path="/" element={<MainLayout />}>
                {/* Index indica que esta es la ruta por defecto cuando entras a "/" */}
                <Route index element={<SearchPage />} />
                <Route path="create-playlist" element={<CreatePlaylistPage />} />
                <Route path="my-playlists" element={<MyPlaylistsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;