import React, { useState } from 'react';
import Card from '../components/UIElements/Card';
import Input from '../components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../components/FormElements/validators';
import Button from '../components/FormElements/Button';
import { useForm } from '../hooks/form-hook';
import { useDispatch } from 'react-redux';
import { Login } from '../redux/actions/loggedIn';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';

import './AuthPage.css';

function Auth() {

    const { isloading, error, sendRequest } = useHttpClient();

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [isLoginMode, setIsLoginMode] = useState(true)

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        //console.log(formState.inputs)
        // if(isLoginMode)
        // {
        // dispatch(Login('Abd','ABD','ABD','ABD'))
        // navigate('/',{replace:true})
        // }
        if (!isLoginMode) {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        name: formState.inputs.name.value
                    }), { 'Content-Type': 'application/json' }
                )
                dispatch(Login(
                    responseData.name, responseData.email, responseData.userId, responseData.token
                ))
                localStorage.setItem('userStatus',JSON.stringify({
                    name: responseData.name,
                    email: responseData.email,
                    userid: responseData.userId,
                    token: responseData.token
                }
                ))
                navigate('/', { replace: true })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }), { 'Content-Type': 'application/json' },
                );
                localStorage.setItem('userStatus',JSON.stringify({
                    name: responseData.name,
                    email: responseData.email,
                    userid: responseData.userId,
                    token: responseData.token
                }
                ))
                dispatch(Login(
                    responseData.name, responseData.email, responseData.userId, responseData.token
                ))
               
                navigate('/', { replace: true })
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    // used to switch between login and signup
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)

        }

        setIsLoginMode(prev => !prev)
    }


    return (
        <React.Fragment>

            <Card className="authentication">
                {
                    error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {error}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )
                }
                {
                    isloading && <LoadingSpinner asOverlay />
                }
                <form onSubmit={authSubmitHandler}>
                    {
                        isLoginMode ?
                            (<h2>Login</h2>) : <h2>SignUp</h2>
                    }
                    <hr />
                    {
                        !isLoginMode && (
                            <Input element="input" type="text" id="name" label="Name"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a Name"
                                onInput={inputHandler}
                            />
                        )
                    }
                    <Input element="input" id="email" type="email" label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                    />

                    <Input element="input" id="password" type="password" label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password, atleast 5 characters"
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    Switch to {isLoginMode ? "SIGNUP" : "LOGIN"}

                </Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth;
