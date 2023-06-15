import React from 'react';

import Card from '../UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          name={place.name}
          description={place.description}
          startDate={place.startDate}
          endDate={place.endDate}
          seats={place.seats}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
