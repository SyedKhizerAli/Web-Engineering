import React from 'react'
import Button from '../FormElements/Button'
import { useSelector } from 'react-redux'
import { useHttpClient } from '../../hooks/http-hook'
import LoadingSpinner from '../UIElements/LoadingSpinner'
import './WishlistCard.css'
const WishlistCard = (props) => {
    const { isloading, error, sendRequest } = useHttpClient();
    const userData = useSelector((state => state))

    const removeItem = async () => {
        try {
            const responseData = await sendRequest
                (`http://localhost:5000/api/trips/${userData.userid}/${props.id}/wishlist`,
                    'DELETE', null,
                    {
                        Authorization:'Bearer '+userData.token
                    }
                )
            console.log(responseData)
            props.onDelete(props.id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="hist-card">
            <div className="box">
                <div className="content">
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
                        isloading && (

                            <LoadingSpinner asOverlay />
                        )
                    }
                    <h3 className='text-dark'>{props.name}</h3>
                    <h4 className='text-dark'>Start Date: {props.startDate} </h4>
                    <h4 className='text-dark'>End Date: {props.endDate}</h4>
                    <Button onClick={removeItem}>Remove from Wishlist</Button>
                </div>
            </div>
        </div>
    )
}

export default WishlistCard
