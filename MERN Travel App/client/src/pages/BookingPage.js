import React from 'react'
import Input from '../components/FormElements/Input'
import Button from '../components/FormElements/Button'
import { VALIDATOR_REQUIRE } from '../components/FormElements/validators'
import { useForm } from '../hooks/form-hook'
import './PlaceForm.css'
import { useLocation,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useHttpClient } from '../hooks/http-hook'
import LoadingSpinner from '../components/UIElements/LoadingSpinner'

const BookingPage = () => {
  const navigate=useNavigate()
  const { isloading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm({
    seats: {
      value: '',
      isValid: false
    }
  }, false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const responseData = await sendRequest(`http://localhost:5000/api/trips/${userData.userid}/${data.state.id}/booking`,
        'POST',
        JSON.stringify({
          seats: formState.inputs.seats.value
        }), { 'Content-Type': 'application/json',
        Authorization:'Bearer '+userData.token
      }
      )
      navigate('/trip',{state:responseData.message})
        
    } catch (error) {
      console.log(error)
    }
  }
  const data = useLocation();
  const userData = useSelector((state => state))

  return (
    <div>
     <div className="container mt-3">
    
    <div className="jumbotron " style={{backgroundColor: 'lightblue'}}>
      <div className="container">
        <h1 className="text-center">{data.state.name}</h1>
        <h2 className='text-center'>Available Seats: {data.state.seats}</h2>
        <h6 className='text-center'>Start Date: {data.state.startDate}</h6>
        <h6 className='text-center'>End Date: {data.state.endDate}</h6>
      </div>
    </div>    
    </div>

      {/* <div className='text-center'>
        <h1 className='text-success'>{data.state.name}</h1>
        <h2 className='text-danger'>Available Seats: {data.state.seats}</h2>
        <h6 className='text-success'>Start Date: {data.state.startDate}</h6>
        <h6 className='text-success'>End Date: {data.state.endDate}</h6>
      </div> */}
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
        <Input
          id="seats"
          element="input" type="text" label="Number of Seats" errorText="Invalid Seats"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid} >
          Confirm Booking
        </Button>

      </form>
    </div>
  )
}

export default BookingPage
