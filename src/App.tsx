import React, {ReactElement} from "react";
import {useForm} from "react-hook-form";
import Select from 'react-select';
import "./App.scss"

const countryCodes = [
    { label: '+1', value: '1' },
    { label: '+44', value: '44' },
    { label: '+61', value: '61' },
    // Add more country codes as needed
];

const App = (): ReactElement => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (content: any) => alert(JSON.stringify(content));

    console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label>
                <input type="text" {...register("firstName", 
                    {
                        required: "This input field is required", 
                        pattern: /^[A-Za-z]+$/i
                    }
                    )} placeholder="First Name" className="form-input"/>
            </label>
            <label>
                <input type="text" {...register(
                    "lastName", 
                    {
                        required: "This input field is required", 
                        pattern: /^[A-Za-z]+$/i
                    }
                    )} placeholder="Last Name" className="form-input"/>
            </label>
            <label>
                <input type="email" {...register("email", {required: "This input field is required"})} placeholder="Email" className="form-input"/>
            </label>
            <label className="form-phone">
                <Select options={countryCodes} className="form-select"/>
                <input type="tel" {...register("phone", {required: "This input field is required"})} placeholder="Phone" className="form-input"/>
            </label>
            <input type="submit" value="Submit" className="form-submit"/>
        </form>
    )
}

export default App;