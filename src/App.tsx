import React, {ReactElement} from "react";
import {useForm} from "react-hook-form";
import {isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "./App.scss"

const countryCodes = [" ", "+1", "+61","+86"]



const App = (): ReactElement => {
    const {register, handleSubmit, setValue, getValues, setError, formState: {errors, isDirty}} = useForm({defaultValues:{
        firstName: "", lastName: "", email: "", countryCode:"", phone: ""
    }});
    const onSubmit = (content: any) => {
        alert(JSON.stringify(content))
    };
    const validatePhone = () => (
        isValidPhoneNumber(getValues("countryCode") + getValues("phone"))
        ? true
        : 'Invalid phone number'
    );
    const normalPattern = (value: string, pattern: string) => {
        if (!new RegExp(pattern).test(value)) {
            return "Invalid input. Only letters are allowed.";
          }
          return true;
    }
    const normalRequired = (value: string) => {
        if (!value) {
          return "First Name is required";
        }
        return true;
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, pattern: string) => {
        setValue("firstName", e.target.value);
        normalPattern(e.target.value, pattern)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label>
                <p className="form-entry-title">First Name</p>
                <input type="text" {...register("firstName",{
                    validate: (value) => normalPattern(value, "^[A-Za-z]") && normalRequired(value)
                })}
                    onChange={(e) => handleInputChange(e, "^[A-Za-z]")}
                    className={`form-input${errors.firstName ? "-input-error" : ""}`}/>
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
                    })}
                    onChange={(e) => {
                        setValue("lastName", e.target.value, { shouldValidate: true }); 
                    }}
                    className={`form-input${errors.lastName ? "-input-error" : ""}`}/>
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
                    })}
                    onChange={(e) => {
                        setValue("email", e.target.value, { shouldValidate: true }); 
                    }}
                    className={`form-input${errors.email ? "-input-error" : ""}`}
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
                            validate: () => (validatePhone())
                        })}
                        onChange={(e) => {
                            setValue("phone", e.target.value, { shouldValidate: true }); 
                        }}
                        className={`form-input${errors.phone ? "-input-error" : ""}`}
                    />
                </div>
                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </label>
            <input type="submit" value="Submit" className={!isDirty ? "form-submit": "form-submit-enabled"}/>
        </form>
    )
}

export default App;

/**
 * <label>
                <p className="form-entry-title">First Name</p>
                <input type="text" {...register("firstName", {
                        required: "First name is required",
                        pattern: {
                            value: /^[A-Za-z]/,
                            message: "First name should only contain letters",
                        },
                    })}
                    onChange={(e) => {
                        setValue("firstName", e.target.value, { shouldValidate: true }); 
                    }}
                    className={`form-input${errors.firstName ? "-input-error" : ""}`}/>
                {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
            </label>
 */