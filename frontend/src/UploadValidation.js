function Validation(formData,response) {
    let error = {}

    if (formData.filename === "") {
        error.filename = "Filename should not be empty"
        error.err = true
    }
    else {
        error.filename = ""
    }

    if (formData.professorid === "") {
        error.professorid = "Professor should not be empty"
        error.err = true
    }
    else {
        error.professorid = ""
    }

    if (formData.file === null) {
        error.file = "File entry should not be empty"
        error.err = true
    }
    else if (response != 200) {
        error.file = "Upload failed"
        error.err = true
    }
    else {
        error.file = ""
    }
    return error;
}

export default Validation;