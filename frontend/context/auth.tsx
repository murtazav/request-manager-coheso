"use client";
import { loginApi, meApi, signupApi } from "@/services/api-services";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    loading: true,
    login: () => {},
    logout: () => {},
    signup: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            // call api to login
            const data = await loginApi(email, password);
            if (data.token && data.user) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                if(['/login','/signup'].includes(window.location.pathname))
                    router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const logout = () => {};
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            // call api to get user data
            const data = await meApi();
            console.log(data);
            if (data.user) {
                console.log(data.user);
                setUser(data.user);
                if(['/login','/signup'].includes(window.location.pathname))
                    router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
            // remove token from local storage
            localStorage.removeItem("token");
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            setLoading(true);
            const data = await signupApi(email, password);
            if (data.token && data.user) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                if(['/login','/signup'].includes(window.location.pathname))
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const isLoggedIn = !!user;

    return <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout, signup }}>{children}</AuthContext.Provider>;
};
