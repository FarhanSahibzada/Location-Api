import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import axios, { AxiosError } from "axios";
import { useDispatch } from 'react-redux'
import { login } from "../Store/AuthSlice";
import { FirebaseError } from "firebase/app";

export class AuthService {
    private auth;
    constructor() {
        this.auth = auth;
    }

    async createAccount({ name, email, password }: { name: string, email: string, password: string }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            if (user) {
                const data = {
                    name: name,
                    email: email,
                    firebaseUid: user.uid
                }
                const response = await axios.post(`${import.meta?.env.VITE_BACKEND_URL}/register`, data);
                if (response && response.data) {
                    return response.data.data;
                }
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
            return user;

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
    async getCurrentUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    console.log("Current user:", user.uid);
                    resolve(user.uid);
                } else {
                    console.log("No user is signed in.");
                    resolve(null);
                }
            })
        })
    }
}
const authServices = new AuthService()

export default authServices;