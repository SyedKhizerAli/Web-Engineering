import React from 'react'
import WishlistCard from './WishlistCard';
import './WishlistCard.css';
const WishlistCardList = (props) => {
  return (
    <div className='hist-container'>
      {props.list.map(m=>{
        return <WishlistCard name={m.name} 
        startDate={m.startDate} id={m._id} 
        key={m._id}
        endDate={m.endDate}
        onDelete={props.onDelete}
        />
      })}
    </div>
  )
}

export default WishlistCardList
