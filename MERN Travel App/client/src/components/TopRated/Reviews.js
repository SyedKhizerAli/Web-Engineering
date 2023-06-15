import React from 'react'
import './Reviews.css';
const Reviews = (props) => {
    return (
        <div className="review-card">
            <div className="row d-flex">
                <div className="d-flex flex-column">
                    <h3 className="mt-2 mb-0 text-light">Given by: {props.name}</h3>
                    <div>
                        <h5 className="text-left"><span className="text-light">Rating: {props.rating}.0</span> </h5>
                    </div>
                </div>

            </div>
            <div className="row text-left">
                <h4 className="text-light mt-3">"{props.review}"</h4>
            </div>
        </div>
    )
}

export default Reviews
