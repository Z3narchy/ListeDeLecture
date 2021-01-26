import {
    createContext, 
    useContext
} from 'react';

export const ContexteAuth = createContext();

export function UtiliseAuth() {
    return useContext(ContexteAuth);
}
