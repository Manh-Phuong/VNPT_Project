import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: 'manhphuong698',
        name: 'Mạnh Phương',
        tick: true,
        avatar: 'https://vietabinhdinh.edu.vn/wp-content/uploads/1679497698_46_1001-ANH-AVATAR-ANIME-dep-chat-va-ca-tinh-LONG.jpg',
    });

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
