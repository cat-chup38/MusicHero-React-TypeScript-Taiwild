import { useState, useEffect } from 'react';

// Usamos Generics <T> para que este hook sirva para cualquier tipo de dato
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Establecemos un temporizador
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpieza: si el usuario vuelve a escribir antes de que pase el 'delay',
        // cancelamos el temporizador anterior y empezamos de nuevo.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}