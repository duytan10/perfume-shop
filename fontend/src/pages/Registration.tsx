import React, { FC, FormEvent, useEffect, useState } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../redux/reducers/root-reducer';
import { formReset, registration } from '../redux/thunks/auth-thunks';
import { AuthErrors, UserRegistration } from '../types/types';
import { checkPasswords, validateEmail, validatePassword } from '../utils/input-validators';

const Registration: FC = () => {

    const dispatch = useDispatch()
    const isRegistered: boolean = useSelector((state: AppStateType) => state.auth.isRegistered)
    const loading: boolean = useSelector((state: AppStateType) => state.auth.loading)
    const errors: Partial<AuthErrors> = useSelector((state: AppStateType) => state.auth.errors)
    const {emailError, firstNameError, lastNameError, passwordError, password2Error} = errors
    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const [captchaValue, setCaptchaValue] = useState<string | null>("")

    const [passwordInputError, setpasswordInputError] = useState<string>("")
    const [password2InputError, setpassword2InputError] = useState<string>("")
    const [emailInputError, setemailInputError] = useState<string>('')

    useEffect(() => {
        dispatch(formReset())
    }, [])

    

    useEffect(() => {
        setEmail("")        
        setFirstName("")
        setLastName("")
        setPassword("")
        setPassword2("")
        setCaptchaValue("")
    }, [isRegistered])

    useEffect(() => {
        setpasswordInputError(validatePassword(password))
        setemailInputError(validateEmail(email))
        if (password !== "") {
            setpassword2InputError(checkPasswords(password, password2))
        }
    }, [password, email, password2])

    const onClickSignUp = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userRegistrationData: UserRegistration = { email, firstName, lastName, password, password2, captcha: captchaValue }
        dispatch(registration(userRegistrationData))
        // @ts-ignore
        window.grecaptcha.reset()
    }

    const onChangeRecaptcha = (token: string | null): void => {
        setCaptchaValue(token)
    }

    return (
        <div className='registration'>
            <h3>YOUR ACCOUNT</h3>
            <h4>Create an account</h4>
            {isRegistered ? <div className="registration__alert" role="alert">
                Activation code has been sent to your email!
            </div> : null}
            <form onSubmit={onClickSignUp}>
                <div className="registration__form registration__form__email">
                    <div className={`registration__form__input ${emailError ? 'is-invalid' : ''}`}>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder=' '
                            onChange={(event) => setEmail(event.target.value)}/>
                        <label className="registration__form__label">E-mail</label>
                        <div className="invalid-feedback">{emailError}</div>
                        <div className="invalid-feedback-input">{emailInputError}</div>
                    </div>
                </div>
                <div className="registration__form registration__form__name">
                    <div className={`registration__form__input ${firstNameError ? 'is-invalid' : ''}`}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder=' '
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}/>
                        <label className="registration__form__label">First name</label>
                        <div className="invalid-feedback">{firstNameError}</div>
                    </div>
                    <div className={`registration__form__input ${lastNameError ? 'is-invalid' : ''}`}>
                        <input
                            type="text"
                            name="lastName"
                            placeholder=' '
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}/>
                        <label className="registration__form__label">Last name</label>
                        <div className="invalid-feedback">{lastNameError}</div>
                    </div>
                </div>
                <div className="registration__form">
                    <div className={`registration__form__input ${passwordError ? 'is-invalid' : ''}`}>
                        <input
                            type="password"
                            name="password"
                            placeholder=' '
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}/>
                        <label className="registration__form__label">Password</label>
                        <div className="invalid-feedback">{passwordError}</div>
                        <div className="invalid-feedback-input">{passwordInputError}</div>
                    </div>
                </div>
                <div className="registration__form">
                    <div className={`registration__form__input ${password2Error ? 'is-invalid' : ''}`}>
                        <input
                            type="password"
                            name="password2"
                            placeholder=' '
                            value={password2}
                            onChange={(event) => setPassword2(event.target.value)}/>
                        <label className="registration__form__label">Confirm password</label>
                        <div className="invalid-feedback">{password2Error}</div>
                        <div className="invalid-feedback-input">{password2InputError}</div>
                    </div>
                </div>
                <div className="registration__form__button">
                    <button type="submit">
                        CREATE AN ACCOUNT
                    </button>
                </div>
                <div className='captcha'>
                    <ReCAPTCHA  onChange={onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"/>
                </div>
            </form>
        </div>
    )
}

export default Registration