import axios from "axios";
import { useEffect, useState } from "react";
import { getUserName } from "../utils/handleApi";
const baseURL =  "https://mern-app-backend-8s5w.onrender.com";

export default function useFetch(query){
    const [getData, setData] = useState({isLoading: false, apiData: undefined, status: null, serverError: null});

    useEffect(() => {
    
        const fetchData = async () => {
            try {
                setData(prev => ({...prev, isLoading: true}));
                const {userName} = !query? await getUserName() : "";
                const {data, status} = !query? await axios.get(`${baseURL}/user/userName/${userName}`) : await axios.get(`${baseURL}/user/${query}`);
                if(status === 200){
                    setData(prev => ({...prev, isLoading: false, apiData: data, status: status}));
                }
                setData(prev => ({...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({...prev, isLoading: false, serverError: error}));
            }
        }
        fetchData();
    }, [query]);
    return [getData, setData];
}