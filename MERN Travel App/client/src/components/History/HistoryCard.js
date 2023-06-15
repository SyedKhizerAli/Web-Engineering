import React from 'react'
import Button from '../FormElements/Button';
import './HistoryCard.css';
const HistoryCard = (props) => {
    return (
        <div className="hist-card">
            <div className="box">
                <div className="content">
                    <h3 className='text-dark'>{props.name}</h3>
                    <h4 className='text-dark'>Start Date: {props.startDate} </h4>
                    <h4 className='text-dark'>End Date: {props.endDate}</h4>
                    <p className='text-dark'>Seats Booked: {props.seats}</p>
                    {
                        !props.rated?<Button danger to={`/${props.id}/rating`}  >Rate trip</Button>:(
                            <h3 className='text-danger'>Trip Already Rated!</h3>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default HistoryCard
