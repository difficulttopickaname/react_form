import React, {ReactElement} from "react";
import {useForm, Controller } from "react-hook-form";
import PhoneInput, {isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "./App.scss"

const countries=["AU", "CN", "US"];

const App = (): ReactElement => {
    const {register, setValue, getValues, handleSubmit, control, formState: {errors}} = useForm({defaultValues:{
        firstName: "", lastName: "", email: "", phone: ""
    }});
    const onSubmit = (content: any) => {
        if(errors){
            alert(JSON.stringify(content))
        }
    };

    console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label>
                <p className="form-entry-title">First Name</p>
                <input type="text" {...register("firstName")} required pattern="^[A-Za-z]" className="form-input"/>
                {errors.firstName && <p className="error-message">Invalid Name</p>}
            </label>
            <label>
                <p className="form-entry-title">Last Name</p>
                <input type="text" {...register("lastName")} required pattern="^[A-Za-z]"  className="form-input"/>
                {errors.lastName && <p className="error-message">Invalid Name</p>}
            </label>
            <label>
                <p className="form-entry-title">Email</p>
                <input type="email" {...register("email")} required className="form-input"/>
                {errors.email && <p className="error-message">Invalid Email</p>}
            </label>
            <label className="form-phone">
                <p className="form-entry-title">Phone</p>
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true, validate: (value) => isValidPhoneNumber(value) }}
                    render={() => (
                        <PhoneInput
                            value={getValues("phone")}
                            onChange={(newValue) => setValue("phone", `${newValue}`)}
                            countries={countries as any}
                            className="form-input"
                            required
                        />
                    )}
                />
                {errors.phone && <p className="error-message">Invalid Phone</p>}
            </label>
            <input type="submit" value="Submit" className="form-submit"/>
        </form>
    )
}

export default App;