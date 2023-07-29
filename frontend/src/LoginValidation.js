function Validation(values, response) {
    let error = {}
    //without space character accept all 
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    //at least 1 digit, at least one character ,at least one capital character and minimum 8 
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if (values.email === "") {
        error.email = "Name should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
       error.email = "Email is invalid"
    }
    else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }
    else if (response != 200) {
        error.password = "Email or password is incorrect"
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;