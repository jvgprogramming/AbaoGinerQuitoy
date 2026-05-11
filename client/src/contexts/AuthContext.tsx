import type {UserDetails} from '../interfaces/AuthInterface';
import React, { useContext, useEffect, type ReactNode} from 'react';
import { useState } from 'react';
import AuthService from '../services/AuthService';


interface AuthContextType {
    user: UserDetails | null;
    loading: boolean;
    login: (username: string, password: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (username: string, password: string) => {
        try{
            const res = await AuthService.login({ username, password });
            
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data);
            }else {
                console.error('Unespected status error uccured:', res.status);
            }
        }catch (error) {
            console.error('Unnn expected server error accured during Login user:', error);
            throw error;
        }
    }

    const logout = async () => {
        try {
            const res = await AuthService.logout();

            if (res.status === 200) {
                localStorage.removeItem('token');
                setUser(null);
            } else {
                console.error('Unexpected status error occurred during Logout user:', res.status);
            }
            
        } catch (error) {
            console.error('Unexpected server error occurred during Logout user:', error);
            throw error;
        }
    }

    const checkAuth = async () => {
        setLoading(true);

        const token = localStorage.getItem('token');

        if (token) {
            try {
                const res = await AuthService.me(); 
                if (res.status === 200) {
                    setUser(res.data);
                } else {
                    console.error('Unexpected status error occurred during checking auth:', res.status);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error('Unexpected server error occurred during checking auth:', error);
                localStorage.removeItem('token');
                setUser(null);
            }  

            setLoading(false);
        } else {
            setUser(null);
            setLoading(false);
        }
    };


    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
