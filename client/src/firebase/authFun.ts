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

            if(!user){
                console.error("error user is not register");
                return false
            }

            user.getIdToken()
            .then((token)=>{
                console.log("get the token : ", token);
             localStorage.setItem("accessToken", token)
            })
            .catch((err)=>{
                console.log("error when saving the token",err);
            })
           
                const data = {
                    name: name,
                    email: email,
                    firebaseUid: user.uid
                }
                const response = await axios.post(`${import.meta?.env.VITE_BACKEND_URL}/register`, data);
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
            
            if(!user){
                console.error("error user is not register");
                return false
            }

            user.getIdToken()
            .then((token)=>{
                console.log("get the token : ", token);
             localStorage.setItem("accessToken", token)
            })
            .catch((err)=>{
                console.log("error when saving the token",err);
            })

            const SearchUser= await axios.post(`${import.meta?.env.VITE_BACKEND_URL}/login`, {email : user.email });
            if(SearchUser && SearchUser.data){
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