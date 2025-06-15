import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import { AxiosError } from "axios";

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

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, data, { withCredentials: true });
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

            user.getIdToken()
                .then((token) => {
                    console.log("get the token : ", token);
                    localStorage.setItem("accessToken", token)
                })
                .catch((err) => {
                    console.log("error when saving the token", err);
                })

            const SearchUser = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, { email: user.email }, { withCredentials: true });
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
            return true
        } catch (error) {
            const err = error as FirebaseError || AxiosError;
            console.error("Error creating account:", err.code, err.message);
            return false
        }
    }
    async getFreshToken() : Promise<string | null>{
        const user = this.auth.currentUser;
        if (user) {
            try {
                const token = await user.getIdToken(true);
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