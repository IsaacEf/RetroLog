function Validation(values,response) {
    let error = {}

    //without space character accept all 
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //at least 1 digit, at least one character ,at least one capital character and minimum 8 
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.firstname === "") {
        error.firstname = "First Name should not be empty"
        error.err = true
    }
    else {
        error.firstname = ""
    }

    if (values.lastname === "") {
        error.lastname = "Last Name should not be empty"
        error.err = true
    }
    else {
        error.lastname = ""
    }
    
    var index = values.email.indexOf("@")
    var length = values.email.length
    var domain = values.email.substring(index+1,length)


    if (values.email === "") {
        error.email = "Email should not be empty"
        error.err = true
    }
    else if (!email_pattern.test(values.email) || domain != "rpi.edu") {
        error.email = "Email is invalid"
        error.err = true
    }
    //else if (!email_pattern.test(values.email)) {
        //error.email = "Email is invalid"
   // }
    else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
        error.err = true
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
        error.err = true
    }
    else if (response != 200) {
        error.password = "Sign-up failed"
        error.err = true
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;