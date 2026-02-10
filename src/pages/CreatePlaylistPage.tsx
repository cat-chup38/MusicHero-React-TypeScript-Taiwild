import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addPlaylist } from '../store/slices/playlist.slice';

// Definimos la forma de los datos del formulario para que TS nos proteja
interface PlaylistForm {
    name: string;
    description: string;
    isPrivate: boolean;
}

export const CreatePlaylistPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Hook para redireccionar programáticamente

    // Estado inicial del formulario
    const [formData, setFormData] = useState<PlaylistForm>({
        name: '',
        description: '',
        isPrivate: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newId = crypto.randomUUID(); // Generamos un ID único técnico

        dispatch(addPlaylist({
            id: newId,
            name: formData.name,
            description: formData.description
        }));

        alert("¡Playlist guardada en Redux!");
        navigate('/my-playlists'); // Navegamos a la nueva página
    };

    // Manejador genérico para todos los inputs
    // Usamos el nombre del input [name] para actualizar la propiedad correcta del objeto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white mt-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Crear Nueva Playlist</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Nombre de la Playlist"
                    name="name"
                    placeholder="Ej: Rock para programar"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Descripción</label>
                    <textarea
                        name="description"
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                        type="checkbox"
                        name="isPrivate"
                        id="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleChange}
                        className="w-5 h-5 accent-blue-600"
                    />
                    <label htmlFor="isPrivate" className="font-medium cursor-pointer">Hacer esta lista privada</label>
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                >
                    Guardar Playlist
                </button>
            </form>
        </div>
    );
};