export default function Validation(values) {
    let errors = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(values?.name){
    if(values.name === ""){
        errors.name = "Name Should Not be empty";
    } else if(values.name.length < 3 || values.name.length > 30){
        errors.name = "Name must be between 3-30";
    } else {
        errors.name = "";
    }
}
    
    
    if(values.email.trim() === ""){
        errors.email = "Email Should Not be empty"
    // } else if(!email_pattern.test(values.email)){
    //     errors.email = "Invalid Email!!!"
    } else {
        errors.email = ""
    }


    if(values.password === ""){
        errors.password = "Password Should Not be empty"
    // } else if(!password_pattern.test(values.password)){
    //     errors.password = "Password Should be 1 small letter, 1 capital letter, a number to {8}}"
    } else {
        errors.password = ""
    }

    return errors;
}

