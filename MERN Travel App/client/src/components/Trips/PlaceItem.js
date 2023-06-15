import React, { useState } from 'react';
import Card from '../UIElements/Card';
import Button from '../FormElements/Button';
import { useNavigate } from 'react-router-dom';
import BootstapModal from '../UIElements/BootstapModal';
import { useHttpClient } from '../../hooks/http-hook';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import './PlaceItem.css';

const PlaceItem = props => {
  const { isloading, error, sendRequest } = useHttpClient();
  const userData = useSelector((state => state))
  const navigate = useNavigate()
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [wishlistData, setWishlistData] = useState('')
  const showWishlist = () => {
    setShowWishlistModal(true);
  }
  const cancelWishlist = () => {
    setShowWishlistModal(false);
  }

  const showBookingWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelBookingHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmBookingHandler = () => {
    setShowConfirmModal(false);
    //booking logic here
    navigate(`/${props.id}/booking`, { state: props })
  };
  const confirmWishlist = async () => {
    setShowWishlistModal(false)
    try {
      const responseData = await sendRequest(`http://localhost:5000/api/trips/${userData.userid}/${props.id}/wishlist`,
        'POST',
        null,
        {
          Authorization: 'Bearer ' + userData.token
        }
      )
      setWishlistData(responseData.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <BootstapModal showConfirmModal={showConfirmModal}
        cancelBookingHandler={cancelBookingHandler}
        confirmBookingHandler={confirmBookingHandler}
        action="Book"
        body="Do you want to proceed to booking page?"
      />

      <BootstapModal showConfirmModal={showWishlistModal}
        cancelBookingHandler={cancelWishlist}
        confirmBookingHandler={confirmWishlist}
        action="Add to Wishlist"
        body="Do you want to add this trip to wishlist?"
      />

      <li className="place-item">
        <Card className="place-item__content">
          {
            isloading && <LoadingSpinner asOverlay />
          }
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          {wishlistData && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {wishlistData}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="place-item__info">
            <h2>{props.name}</h2>
            <h6>Start Date: {props.startDate}</h6>
            <h6>End Date: {props.endDate}</h6>
            <h5>Available Seats: {props.seats}</h5>
            <p>{props.description}</p>
          </div>
          {
            userData.login && (
              <div className="place-item__actions">
                <Button danger onClick={showBookingWarningHandler}>
                  Book Trip
                </Button>
                <Button onClick={showWishlist}>Add to Wishlist</Button>
              </div>)
          }
        </Card>
      </li>
    </div>
  );
};

export default PlaceItem;
