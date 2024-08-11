import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { auth, db } from "../services/fireBase"; 
import { setDoc, doc } from 'firebase/firestore'; 


interface AuthContextType {
    user: User | null; 
    signUp: (email: string, password: string) => Promise<UserCredential>; 
    logIn: (email: string, password: string) => Promise<UserCredential>; 
    logOut: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentuser",currentUser)
            setUser(currentUser); 
        });

        return () => unsubscribe(); 
    }, []);

  
    const signUp = async (email: string, password: string) => {
    
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const userDocRef = doc(db, 'users', email);
        await setDoc(userDocRef, {
            favShows: [],
        });

        return userCredential;
    };
   
    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    
    const logOut = () => {
        return signOut(auth);
    };

  
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider"); 
    }
    return context;
}
