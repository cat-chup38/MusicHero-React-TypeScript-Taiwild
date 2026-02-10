import React from 'react';

// Extendemos los atributos nativos de un input para que nuestro componente
// acepte cualquier propiedad que un input normal aceptaría (type, onChange, value, etc.)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
            <input
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${className}`}
                {...props} // El 'spread operator' pasa todas las props nativas al elemento input
            />
        </div>
    );
};