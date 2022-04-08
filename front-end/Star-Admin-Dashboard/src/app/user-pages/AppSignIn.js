import React from 'react';
import Register from "./Register"
import { AuthProvider } from "../contexts/AuthContext";

export default function AppSignIn(){
    return(
        <AuthProvider>
            <Register/>
        </AuthProvider>
    )
}
