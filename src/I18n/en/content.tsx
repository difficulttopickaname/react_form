export default{
    firstName: {
        name: "first name",
        title: "First Name",
        pattern: "^[A-Za-z]",
        pattern_message: "Invalid input. Only letters are allowed.",
    },
    lastName: {
        name: "last name",
        title: "Last Name",
        pattern: "^[A-Za-z]",
        pattern_message: "Invalid input. Only letters are allowed.",
    },
    email: {
        name: "email",
        title: "Email",
        pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$",
        pattern_message: "Invalid email address. (valid example: 1234@as.df)",
    },
    countryCode:{
        name: "country code",
    },
    phone: {
        name: "phone",
        title: "Phone",
        pattern: "^[0-9]",
        pattern_message: "Invalid input. Only numbers are allowed.",
        special_message: "Invalid phone number.",
    },

    button: {
        submit: "Submit",
        clear: "Set to Default",
        previous: "Load Previous",
    },
}