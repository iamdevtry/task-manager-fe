import jwt_decode from 'jwt-decode';
import { TokenDecoded } from '../../interfaces';
const AuthService = {
    setUser: (res: any) => {
        if (res && res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }
    },
    removeUser: () => {
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        return localStorage.getItem('user');
    },
    getIdUser: () => {
        let currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            let token = JSON.parse(currentUser).token;
            let decoded: TokenDecoded = jwt_decode(token);
            return decoded.payload.user_id;
        }

        return null;
    },
};

export default AuthService;
