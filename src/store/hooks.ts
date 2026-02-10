import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Usamos 'import type' para indicar que solo traemos definiciones de tipos, no código ejecutable
import type { RootState, AppDispatch } from './index';

// Ahora aplicamos esos tipos a los hooks estándar de Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;