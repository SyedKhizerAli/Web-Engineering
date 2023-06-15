import React from 'react'
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../components/FormElements/validators';
import Input from '../components/FormElements/Input';
import { useSelector, useDispatch } from 'react-redux';
import { EditProfile as editReducer } from '../redux/actions/editProfile';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import Button from '../components/FormElements/Button';
import { useNavigate } from 'react-router-dom';
import './PlaceForm.css';

const EditProfile = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state => state))
    const { isloading, error, sendRequest } = useHttpClient();
    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(`http://localhost:5000/api/users/${userData.userid}/edit`,
            'PATCH',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
                ,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + userData.token
                }
            )
            dispatch(editReducer(responseData.name,responseData.email))
            navigate('/',{replace:true})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className='place-form' onSubmit={onSubmitHandler}>
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
                <h2 className='text-center'>Edit Profile</h2>
                <Input
                    id="name"
                    element="input" type="text" label="Enter Name" errorText="Invalid Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValue={userData.name}
                    initialValid={true}
                    onInput={inputHandler}
                />
                <Input
                    id="email"
                    element="input" type="text" label="Enter Email" errorText="Invalid Email"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    initialValue={userData.email}
                    initialValid={true}
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input" type="password" label="Enter Password" errorText="Please enter a valid password, atleast 5 characters"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid} >
                    Edit
                </Button>

            </form>
        </div>
    )
}

export default EditProfile
