import React, { useState } from 'react'
import StarRating from '../components/FormElements/StarRating';
import { useForm } from '../hooks/form-hook';
import Input from '../components/FormElements/Input';
import Button from '../components/FormElements/Button';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';
import { useParams } from 'react-router-dom';
import { VALIDATOR_REQUIRE } from '../components/FormElements/validators';
import { useSelector } from 'react-redux';
import './PlaceForm.css';

const Ratings = () => {
  const navigate = useNavigate();
  const tripid = useParams().pid;
  const { isloading, error, sendRequest } = useHttpClient();
  const [star, setStar] = useState(0);
  const userData = useSelector((state => state))
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/trips/${userData.userid}/${tripid}/rating`,
        'POST',
        JSON.stringify({
          rating: star,
          review: formState.inputs.review.value
        }), {
          'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token

      }
      );
      navigate(`/${userData.userid}/history`, { state: responseData.message })
    } catch (error) {
      console.log(error)
    }

  }
  const getRating = (rating) => {
    setStar(rating)
  }
  const [formState, inputHandler] = useForm({
    review: {
      value: '',
      isValid: false
    }
  }, false)
  return (
    <form className='place-form' onSubmit={onSubmitHandler}>
      <div className='text-danger text-center'>
        <h4>Rate your experience: <span> <StarRating getRating={getRating} /></span></h4>
      </div>
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
        id="review"
        element="textarea" label="Give Review" errorText="Invalid Review"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid} >
        Give Review
      </Button>

    </form>

  )
}

export default Ratings
