import { useState } from 'react';

export default function useAuthProvider() {
    const [token, setToken] = useState(null);
    
    return {
        token,
        setToken
    };
};