function Validation(values) {
    let error = {}

    //without space character accept all 
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //at least 1 digit, at least one character ,at least one capital character and minimum 8 
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.fname === "") {
        error.fname = "First Name should not be empty"
    }
    else {
        error.fname = ""
    }

    if (values.lname === "") {
        error.lname = "Last Name should not be empty"
    }
    else {
        error.lname = ""
    }

    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Last Name should not be empty"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;