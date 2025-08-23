import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  linkWithCredential,
  EmailAuthProvider,
  fetchSignInMethodsForEmail 
} from "firebase/auth";
import { auth, google_provider , github_provider } from "./firebase.config";
import { FirebaseError } from "firebase/app";
import { AxiosError } from "axios";
import api from "../api/axios/index";
``
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
                firebase_uid: user.uid
            }

            const response = await api.post(`/user/register`, data);
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

            const SearchUser = await api.post(`/user/login`, { email: user.email });
            if (SearchUser && SearchUser.data) {
                return SearchUser.data?.data;
            }

        } catch (error) {
            const err = error as FirebaseError || AxiosError;
            console.error("Error creating account:", err.code, err.message);
            throw err;
        }
    }
    async logoutAccount() {
        try {
            const userCredential = await signOut(this.auth);

            return true
        } catch (error) {
            const err = error as FirebaseError || AxiosError;
            console.error("Error creating account:", err.code, err.message);
            return false
        }
    }

    async getFreshToken(): Promise<string | null> {
        try {
            const user = this.auth.currentUser;
            const token = await user?.getIdToken() as string;

            return token;
        } catch (error) {
            console.error("error when getting the access Id from firebase  ", error);
            return null;
        }
    }

    async google_register() {
        try {
            // 1) firebase google registerinr  
            const { user } = await signInWithPopup(this.auth, google_provider);
            if (!user) return false;

            // 2) Backend login checking user already login or not 
            try {
                const loginRes = await api.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {}); // token header interceptor laga hua hai
                return loginRes.data?.data;
            } catch (e) {
                const ax = e as AxiosError;
                // if we can not find the user
                if (ax.response?.status === 404) {
                    const payload = {
                        name: user.displayName || "Unknown",
                        email: user.email,
                        firebase_uid: user.uid,
                    };
                    const regRes = await api.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, payload);
                    return regRes.data?.data;
                }
                throw e;
            }
        } catch (error) {
            console.error("Google sign-in failed:", error);
            return false;
        }
    }
    

}

const authServices = new AuthService()

export default authServices;