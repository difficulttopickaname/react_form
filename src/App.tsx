import React, {ReactElement} from "react";
import {useForm} from "react-hook-form";
import {isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "./App.scss"

const countryCodes = [" ", "+1", "+61","+86"]

const validatePhone = (countryCode: string, number: string) => (
    isValidPhoneNumber(countryCode + number)
    ? true
    : 'Invalid phone number'
)

const App = (): ReactElement => {
    const {register, handleSubmit, getValues, formState: {errors}} = useForm({defaultValues:{
        firstName: "", lastName: "", email: "", countryCode:"", phone: ""
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
                <input type="text" {...register("firstName", {
                    required: "First name is required",
                    pattern: {
                        value: /^[A-Za-z]/,
                        message: "First name should only contain letters",
                    },
                })} className={`form-input${errors.firstName ? "-input-error" : ""}`}/>
                {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
            </label>
            <label>
                <p className="form-entry-title">Last Name</p>
                <input type="text" {...register("lastName", {
                    required: "Last name is required",
                    pattern: {
                        value: /^[A-Za-z]/,
                        message: "Last name should only contain letters",
                    },
                })} className={`form-input${errors.lastName ? "-input-error" : ""}`}/>
                {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
            </label>
            <label>
                <p className="form-entry-title">Email</p>
                <input type="text" {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                    },
                })} className={`form-input${errors.email ? "-input-error" : ""}`}
                    />
                    {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                    )}
            </label>
            <label className="form-phone">
                <p className="form-entry-title">Phone</p>
                <div className="form-phone-input-field">
                    <select
                        {...register("countryCode", { required: "Please select a country code" })}
                        className={`form-input${errors.countryCode ? "-input-error" : ""}`}
                        id="form-phone-select"
                    >
                    {countryCodes.map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                    </select>
                    <input type="text" {...register("phone", {
                        required: "Phone Number is required",
                        pattern: {
                            value: /^[0-9]/,
                            message: "Invalid phone number",
                        },
                        validate: () => (validatePhone(getValues("countryCode"),getValues("phone")))
                    })} className={`form-input${errors.phone ? "-input-error" : ""}`}
                    />
                </div>
                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </label>
            <input type="submit" value="Submit" className="form-submit"/>
        </form>
    )
}

export default App;

/*

                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true, validate: (value) => isValidPhoneNumber(value) }}
                    render={() => (
                        <PhoneInput
                            value={getValues("phone")}
                            onChange={(newValue) => setValue("phone", newValue ? `${newValue}` : "")}
                            countries={countries as any}
                            className={`form-input${errors.phone ? "-input-error" : ""}`}
                            required
                        />
                    )}
                />
*/