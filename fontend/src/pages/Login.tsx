import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'

import { AppStateType } from '../redux/reducers/root-reducer'
import { activateAccount, formReset, login } from '../redux/thunks/auth-thunks'
import { UserData } from '../types/types'

import googleLogo from '../assets/images/google.png'
import facebookLogo from '../assets/images/facebook.png'

import { validateEmail, validatePassword } from '../utils/input-validators'

const Login: FC<RouteComponentProps<{ code: string}>> = ({match}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const error: string = useSelector((state: AppStateType) => state.auth.error)
    const success: string = useSelector((state: AppStateType) => state.auth.success)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [passwordInputError, setpasswordInputError] = useState<string>("")
    const [emailInputError, setemailInputError] = useState<string>("")

    useEffect(() => {
        dispatch(formReset)

        if (match.params.code) {
            dispatch(activateAccount(match.params.code))
        }
    }, [])

    useEffect(() => {
        setpasswordInputError(validatePassword(password))
        setemailInputError(validateEmail(email))
    }, [password, email])

    const onClickSignIn = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const userData: UserData = { email, password }
        dispatch(login(userData, history))
    }

    return (
        <div className="login">
            <h3>SIGN IN</h3>
            {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
            {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
            <form onSubmit={onClickSignIn}>
                <div className="login__form">
                    <div className="login__form__input">
                        <input
                            type="email"
                            name="email"
                            placeholder=' '
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}/>
                        <label className="login__form__label">Email address</label>
                        <div className="invalid-feedback-input">{emailInputError}</div>
                    </div>
                </div>
                <div className="login__form">
                    <div className="login__form__input">
                        <input
                            type="password"
                            name="password"
                            placeholder=' '
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}/>
                        <label className="login__form__label">Password</label>
                        <div className="invalid-feedback-input">{passwordInputError}</div>
                    </div>
                </div>
                <div className="login__form__function">
                    <Link to={"/forgot"} >I forgot my password</Link>
                    <button type="submit">Sign in</button>
                </div>
            </form>
            <div className="login__oauth2">
                <div className="login__oauth2__content">
                    <a className="login__oauth2__content__button google"
                       href="http://localhost:8080/oauth2/authorize/google">
                        <img src={googleLogo} alt="google"/>Log in with Googles <span></span></a>
                    <a className="login__oauth2__content__button facebook"
                       href="http://localhost:8080/oauth2/authorize/facebook">
                        <img src={facebookLogo} alt="facebook"/>Log in with Facebook <span></span></a>
                </div>
            </div>
        </div>
    )
}

export default Login