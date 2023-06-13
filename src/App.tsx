import React, {ReactElement} from "react";
import {useForm} from "react-hook-form";
import "./App.scss"

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
                    )} placeholder="First Name"/>
            </label>
            <label>
                <input type="text" {...register(
                    "lastName", 
                    {
                        required: "This input field is required", 
                        pattern: /^[A-Za-z]+$/i
                    }
                    )} placeholder="Last Name"/>
            </label>
            <label>
                <input type="email" {...register("email", {required: "This input field is required"})} placeholder="Email"/>
            </label>
            <label>
                <input type="tel" {...register("phone", {required: "This input field is required"})} placeholder="Phone"/>
            </label>
            <input type="submit" value="submit"/>
        </form>
    )
}

export default App;