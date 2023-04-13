import { useAuthStore } from '../state/store';
import Login from "../pages/Login";


export const AuthorizeUser = ({children}) => {
    const token = localStorage.getItem("token");
    if(!token){
        return <Login />;
    }
    return children;
}

export const ProtectedRoute = ({children}) => {
    const {userName} = useAuthStore(state => state.auth);
    if(!userName){
        return <Login />;
    }
    return children;
}