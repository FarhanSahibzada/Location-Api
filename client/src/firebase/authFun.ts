import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import { FirebaseError } from "firebase/app";
import { AxiosError } from "axios";
import api from "../api/axios/index";

export class AuthService {
    private auth;
    constructor() {
        this.auth = auth;
    }

    async createAccount({ name, email, password }: { name: string, email: string, password: string }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            if (!user) {
                console.error("error user is not register");
                return false
            }

            const data = {
                name: name,
                email: email,
                firebaseUid: user.uid
            }

            const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, data);
            if (response && response.data) {
                return response.data.data;
            }


        } catch (error: unknown) {
            const err = error as FirebaseError || AxiosError;
            console.error("Error creating account:", err.code, err.message);
            return false
        }
    }
    async loginAccount({ email, password }: { email: string, password: string }) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            if (!user) {
                console.error("error user is not register");
                return false
            }

            const SearchUser = await api.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, { email: user.email });
            if (SearchUser && SearchUser.data) {
                return SearchUser.data?.data;
            }

        } catch (error) {
            const err = error as FirebaseError || AxiosError;
            console.error("Error creating account:", err.code, err.message);
            return false
        }
    }
    async logoutAccount() {
        try {
            const userCredential = await signOut(this.auth);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpiry');

            return true
        } catch (error) {
            const err = error as FirebaseError || AxiosError;
            console.error("Error creating account:", err.code, err.message);
            return false
        }
    }

    async getFreshToken(): Promise<string | null> {
        const cachedToken = localStorage.getItem("accessToken");
        const expiry = localStorage.getItem("tokenExpiry");
        if (cachedToken && expiry && Date.now() < Number(expiry)) {
            return cachedToken;
        }


        const user = this.auth.currentUser;
        if (user) {
            try {
                const token = await user.getIdToken(true);
                const expiresIn = 60 * 60 * 1000;
                console.log(token)
                localStorage.setItem("accessToken", token);
                localStorage.setItem("tokenExpiry", `${Date.now() + expiresIn}`);
                return token;
            } catch (err) {
                console.error("Error getting fresh token:", err);
                return null;
            }
        } else {
            console.warn("No user is currently signed in");
            return null;
        }
    }

}

const authServices = new AuthService()

export default authServices;