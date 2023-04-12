
import axios from "axios";
import { useEffect, useState } from "react";
import { getUserName } from "../utils/handleApi";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
export default function useFetch(query){
    const [getData, setData] = useState({isLoading: false, apiData: undefined, status: null, serverError: null});

    useEffect(() => {
    
        const fetchData = async () => {
            try {
                setData(prev => ({...prev, isLoading: true}));
                const {userName} = !query? await getUserName() : "";
                const {data, status} = !query? await axios.get(`/user/username/${userName}`) : await axios.get(`/user/${query}`);
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