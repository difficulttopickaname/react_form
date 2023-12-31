import React, {ReactElement} from "react";
import {useForm} from "react-hook-form";
import {isValidPhoneNumber } from 'react-phone-number-input'
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css'
import "./App.scss"
import "./I18n"

const countryCodes = ["", "+1", "+61","+86"]

const fields = ["firstName", "lastName", "email", "countryCode", "phone"]

const defaultValues = fields.reduce<{ [key: string]: string }>((acc, field) => {
    acc[field] = "";
    return acc;
  }, {});

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
  };

const App = (): ReactElement => {
    const { t } = useTranslation('content');
    const {
            register, 
            handleSubmit, 
            setValue, 
            getValues, 
            setError, 
            clearErrors,
            formState: {errors}
        } = useForm({defaultValues: defaultValues});

    const [hasPrevious, handleHasPrevious] = React.useState(localStorage.getItem("dataKey") ? true : false);
    
    const checkDirty = () => {
        for(let i = 0; i < fields.length; i++){
            if(!getValues(fields[i])){
                return false;
            }
        }
        return true;
    }

    const onSubmit = (content: any) => {
        localStorage.setItem('dataKey', JSON.stringify(content));
        handleHasPrevious(true);
        alert(JSON.stringify(content))
    };

    const handleLoadFromLocalStorage = () => {
        const storedData = localStorage.getItem("dataKey");

        if(storedData){
            const data = JSON.parse(storedData);

            Object.keys(data).forEach((fieldName) => {
                setValue(fieldName, data[fieldName])
            });
        }
      };

    const validatePhone = () => {
        if(!getValues("phone") || isValidPhoneNumber(getValues("countryCode") + getValues("phone"))){
            clearErrors("phone");
            return true;
        }
        else{
            setError("phone", {type: "custom", message: t(`phone.special_message`)})
            return t(`phone.special_message`)
        }
    };

    const normalPattern = (value: string, entry: keyof FormValues) => {
        const pattern = t(`${entry}.pattern`)
        if (value && !new RegExp(pattern).test(value)) {
            setError(entry, {type: "custom", message: t(`${entry}.pattern_message`)})
            return t(`${entry}.pattern_message`);
        }
        else{
            clearErrors(entry);
            return true;
        }
    }

    const normalRequired = (value: string, entry: keyof FormValues) => {
        if (!value) {
          setError(entry, {type: "custom", message: `${t(`${entry}.name`)} is required`});
          return `${t(`${entry}.name`)} is required`;
        }
        else{
            clearErrors(entry);
            return true;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, entry: keyof FormValues) => {
        setValue(entry, e.target.value);
        normalPattern(e.target.value, entry) // only check for pattern during input
    }

    return (
        <form className="form">
            <label>
                <p className="form-entry-title">{t("firstName.title")}</p>
                <input type="text" {...register("firstName",{
                    validate: (value) => normalPattern(value, "firstName") && normalRequired(value, "firstName")
                })}
                    onChange={(e) => handleInputChange(e, "firstName")}
                    className={`form-input${errors.firstName ? "-input-error" : ""}`}/>
                {errors.firstName && <p className="error-message">{errors.firstName?.message}</p>}
            </label>
            <label>
                <p className="form-entry-title">{t("lastName.title")}</p>
                <input type="text" {...register("lastName",{
                    validate: (value) => normalPattern(value, "lastName") && normalRequired(value, "lastName")
                })}
                    onChange={(e) => handleInputChange(e, "lastName")}
                    className={`form-input${errors.lastName ? "-input-error" : ""}`}/>
                {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
            </label>
            <label>
                <p className="form-entry-title">{t("email.title")}</p>
                <input type="text" {...register("email",{
                    validate: (value) => normalPattern(value, "email") && normalRequired(value, "email")
                })}
                    onChange={(e) => handleInputChange(e, "email")}
                    className={`form-input${errors.email ? "-input-error" : ""}`}/>
                {errors.email && (<p className="error-message">{errors.email.message}</p>)}
            </label>
            <label className="form-phone">
                <p className="form-entry-title">{t("phone.title")}</p>
                <div className="form-phone-input-field">
                    <select
                        {...register("countryCode", { 
                            validate: (value) => normalRequired(value, "countryCode")
                         })}
                        className={`form-input${errors.countryCode ? "-input-error" : ""}`}
                        id="form-phone-select"
                    >
                    {countryCodes.map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                    </select>
                    <input type="text" {...register("phone",{
                        validate: (value) => normalPattern(value, "phone") && validatePhone() && normalRequired(value, "phone")
                    })}
                        onChange={(e) => {handleInputChange(e, "phone"); validatePhone();}}
                        className={`form-input${errors.phone ? "-input-error" : ""}`}/>
                </div>
                {errors.countryCode && <p className="error-message">{errors.countryCode.message}</p>}
                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </label>
            <input type="submit" value={t("button.submit")} onClick={handleSubmit(onSubmit)} className={!checkDirty() ? "form-button": "form-submit"} />
            <button type="button" className={"form-clear"} 
                    onClick={() => {
                        fields.forEach((fieldName) => {
                            setValue(fieldName, "");
                          });
                        
                          clearErrors();
                    }}
            >{t("button.clear")}</button>
            <button type="button" className={!hasPrevious ? "form-button": "form-previous"}
                    onClick={handleLoadFromLocalStorage}
            >{t("button.previous")}</button>
        </form>
    )
}

export default App;