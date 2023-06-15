import React from 'react'
import Carousel from 'react-bootstrap/Carousel';


const Slideshow = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../../images/carasol1.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Royality Travels</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../../images/carasol2.jpg')}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Take some time off and travel</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../../images/carasol3.jpg')}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>We will provide you with best services</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slideshow
