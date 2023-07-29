function Validation(formData,response) {
    let error = {}

    if (Data.courseid === "") {
        error.courseid = "Courseid should not be empty"
        error.err = true
    }
    else {
        error.courseid = ""
    }

    if (response != 200) {
        error.file = "Download failed"
        error.err = true
    }
    return error;
}

export default Validation;