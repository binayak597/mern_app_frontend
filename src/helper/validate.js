import toast from "react-hot-toast";
import { authenticate } from "../utils/handleApi";

/** validate login page username */
export async function validateUserName(values){
    const errors = userNameVerify({}, values);
    if(values.userName){
        //check user exist or not
        const { status } = await authenticate(values.userName);
        if(status !== 200){
            errors.exist = toast.error("Username is not exist");
        }
    }
    return errors;
}

/**validate user password */
export async function validatePassword(values){
    const errors = passwordVerify({}, values)
    return errors;
}

/**validate user reset password */

export async function resetPasswordOfUser(values){
    const errors = passwordVerify({}, values)

    if(values.confirmpwd.length > 0){
        if(values.password !== values.confirmpwd){
            errors.exist = toast.error("Password didn't match!")
        }
    }
    return errors;
}

/** validate register user form */

export async function validateRegisterForm(values){
    const errors = userNameVerify({}, values);
    passwordVerify({}, values);
    emailVerify({}, values);

    return errors;
}

/** validate profile page */

export async function validateProfile(values){
    const errors = emailVerify({}, values);

    return errors;
}


/***************************************************** */

/** validate username */

function userNameVerify(errors = {}, values){
    if(!values.userName){
        errors.userName = toast.error("Username is Required!")
    }else if(values.userName.includes(" ")){
        errors.userName = toast.error("Invalid Username!")
    }
    return errors;
}

/**validate password */

function passwordVerify(errors = {}, values){
    // eslint-disable-next-line
    const specChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password is Required")
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Password is Wrong")
    }else if(values.password.length < 8){
        errors.password = toast.error("Password must be 8 characters long")
    }else if(!specChars.test(values.password)){
        errors.password = toast.error("Password must have special characters")
    }
    return errors;
}

/** validate email */

function emailVerify(errors = {}, values){
    if(!values.email){
        errors.email = toast.error("Email is Required")
    }else if(values.email.includes(" ")){
        errors.email = toast.error("Email is wrong")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("Invalid Email Adress")
    }

    return errors;
}