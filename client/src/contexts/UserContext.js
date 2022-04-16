import {createContext, useState, useEffect} from "react";



const UserContext = createContext(false)


const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState( ()=>{
        const localData = JSON.parse(localStorage.getItem('auth'));
        return localData;
    });

    const login = () => {
        setAuth(true);
    };

    const logout = () => {
        setAuth(false);
    };

    useEffect(()=>{
        if(auth!=null){localStorage.setItem('auth', JSON.stringify(auth))}
    }, [auth])
    return (
        <UserContext.Provider value={{ auth, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export {
    UserContext,
    UserProvider
}
