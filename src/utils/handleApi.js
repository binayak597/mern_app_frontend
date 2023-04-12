import axios from "axios";
import jwt_decode from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// const baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function authenticate(userName) {
    try {
        const data = await axios.post("/user/authenticate", { userName });
        return data;
    } catch (error) {
        return { error: "Authentication failed" };
    }
}

export async function getUserName() {
    const token = await localStorage.getItem("token");
    if(!token) return Promise.reject({error: "Can't find token"});
    const decodedToken = jwt_decode(token);
    return Promise.resolve(decodedToken);
}

export async function getUser(userName) {
    try {
        const data = await axios.get(`/user/username/${userName}`);
        return data;
    } catch (error) {
        return { error };
    }

}

export async function registerUser(credentials) {
    try {
        const { data: { msg } } = await axios.post("/user/register", credentials)
        const { userName, email } = credentials;
        //after successful registration send response through an email
        const emailData = {
            userName: userName,
            userEmail: email,
            text: msg,
            subject: "Thank You for Joining us"
        }
        axios.post("/user/registerMail", emailData);
        return Promise.resolve(msg);

    } catch (error) {
        return Promise.resolve(error);
    }
}

export async function loginUser({userName, password}) {

    try {
        // if(userName){
        //     const data = await axios.post("/user/login", {userName, password});
        //     return Promise.resolve(data);
        // }
        const data = await axios.post("/user/login", {userName, password});
        return Promise.resolve(data);
        
    } catch (error) {
        return Promise.reject({ error: "Password does not match"});
    }
}

export async function updateUser(updateData) {
    try {
        const token = await localStorage.getItem("token");
        const { data: { msg } } = await axios.put("/user/update",
            updateData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function generateOTP(userName) {

    try {
        const { data: { code } } = await axios.get("/user/generateOTP", {
            params: {
                userName: userName
            }
        })
        const { data: {email} } = await getUser(userName);
        let emailBody = {
            userName: userName,
            userEmail: email,
            text: `Your Recovery password OTP is ${code}. Verify and Recover your Password`,
            subject: "Recovery Password OTP"
        }
        axios.post("/user/registerMail", emailBody);
        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function verifyOTP({ userName, code }) {
    
    try {
        const data  = await axios.get("/user/verifyOTP", {
            params: {
                userName: userName,
                code: code
            }
        })  
        return Promise.resolve(data);   
    } catch (error) {
        return Promise.reject({error});
    }
}

export async function resetPassword({ userName, password }) {
   
    try {
        const data = await axios.put("/user/resetPassword", {
            userName: userName,
            password: password
        }); 
           return Promise.resolve(data);
    
    } catch (error) {
        return Promise.resolve({error});
    }
}