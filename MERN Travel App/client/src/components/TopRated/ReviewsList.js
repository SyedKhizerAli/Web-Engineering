import React from 'react'
import Reviews from './Reviews'
import './Reviews.css'

const ReviewsList = (props) => {
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-10 col-12 text-center mb-5">
                    {
                        props.reviewlist.map((m)=>{
                            return <Reviews name={m.name} rating={m.rating} 
                            review={m.review}
                            />
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default ReviewsList
