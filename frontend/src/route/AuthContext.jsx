// AuthContext.js
import { createContext, useEffect, useState } from "react";
import { ServerApi } from "./ServerAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('loginInfo')) || false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo')) || false;

        if (user) {
            ServerApi(`/auth-check`, 'GET', user.access_token)
                .then(res => {
                    if (res.ok && res.status === 200) {
                        setAuth(true);
                        setUser(user);
                    } else {
                        setAuth(false);
                    }
                })
                .catch(() => setAuth(false))
                .finally(() => setLoading(false));
        } else {
            setAuth(false);
            setLoading(false);
        }
    }, [user]);

    const loginFun = (data) => {
        sessionStorage.setItem("loginInfo", JSON.stringify(data));
        setAuth(true);
        setUser(JSON.parse(sessionStorage.getItem('loginInfo')))
    }

    const logoutFun = () =>{
       sessionStorage.removeItem("loginInfo");
       setAuth(false);
       setUser(null);
    }

    return (
        <AuthContext.Provider value={{ auth, user, loading, loginFun, logoutFun }}>
            {children}
        </AuthContext.Provider>
    );
};
