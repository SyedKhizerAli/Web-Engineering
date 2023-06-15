import React from 'react'
import { Link } from 'react-router-dom'


const Info = () => {

  return (
    <div className="container mt-3">

      <div className="jumbotron " style={{ backgroundColor: 'lightgray' }}>
        <div className="container">
          <h1 className="text-center">Who are we?</h1>
          <p>We aim to become trend-setters in Pakistan.
            We give people opportunities to travel to some of the unexplored places in Pakistan alongside
            usual sight-seeing trips. We have conducted dozens of successful events since and
            inspired hundreds of people. So what are you waiting for? Select your type of
            adventure and get on-board! Bon Voyage!
          </p>
          <Link to='/auth' className="btn btn-dark " data-toggle="tooltip" title="Click here to Create Account!" role="button">Get Started!</Link>

        </div>
      </div>
    </div>
  )
}

export default Info
