import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENPDPOINT,
});

const headerWithAuth = () => {
    return {
        headers: {
            authorization: `${localStorage.getItem("token")}`,
            contentType: "application/json",
        },
    };
}

const headerWithoutAuth = {
    headers: {
        ContentType: "application/json",
    },
}

export const loginApi = async (email: string, password: string) => {
    const response = await api.post("users/login", { email, password }, headerWithoutAuth);
    return response.data;
}

export const signupApi = async (email: string, password: string) => {
    const response = await api.post("users/signup", { email, password }, headerWithoutAuth);
    return response.data;
}

export const meApi = async () => {
    const response = await api.get("users/me", headerWithAuth());
    return response.data;
}