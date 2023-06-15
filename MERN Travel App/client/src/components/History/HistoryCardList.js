import React from 'react'
import HistoryCard from './HistoryCard';
import './HistoryCard.css';
const HistoryCardList = (props) => {
  return (
    <div className='hist-container'>
      {props.list.map(m=>{
        return <HistoryCard name={m.tripDetails.name} seats={m.seatsBooked} 
        startDate={m.tripDetails.startDate} id={m.tripDetails._id} 
        key={m.tripDetails._id}
        endDate={m.tripDetails.endDate}
        rated={m.ratingStatus}
        />
      })}
    </div>
  )
}

export default HistoryCardList
