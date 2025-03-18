import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.auth.js";

export class authService {
    constructor() {
        this.auth = auth;
    }

    async createAccount({ username, email, password }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            if (user) {
                const data = {
                    name: username,
                    email: email
                }
            }

        } catch (error) {
            console.error("Error creating account:", error.code, error.message);
            return false
        }
    }
    async loginAccount({ email, password }) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            return user;

        } catch (error) {
            console.error("Error creating account:", error.code, error.message);
            return false
        }
    }
    async logoutAccount() {
        try {
            const userCredential = await signOut(this.auth);
            return true
        } catch (error) {
            console.error("Error creating account:", error.code, error.message);
            return false
        }
    }
    async getCurrentUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }
}

const AuthServices = new authService()

export default AuthServices;