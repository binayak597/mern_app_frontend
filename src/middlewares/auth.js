import { Navigate} from 'react-router-dom';
import { useAuthStore } from '../state/store';


export const AuthorizeUser = ({children}) => {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to={"/"} replace={true}></Navigate>
    }
    return children;
}

export const ProtectedRoute = ({children}) => {
    const {userName} = useAuthStore(state => state.auth);
    if(!userName){
        return <Navigate to={"/"} replace={true}></Navigate>
    }
    return children;
}