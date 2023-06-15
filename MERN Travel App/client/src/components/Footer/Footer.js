import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <div className="footer-dark mt-5">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <li>Create Account</li>
                                <li>Start Booking your trip</li>
                                <li>See our offers</li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>Royality Travels</h3>
                            <p>Explore the world just by one click</p>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><i className="fab fa-facebook-f"></i>	&nbsp;Facebook&nbsp;</li>
                                <li><i className="fab fa-instagram"></i>&nbsp;Instagram&nbsp;</li>
                                <li><i className="fab fa-twitter"></i>&nbsp;Twitter &nbsp;</li>
                                <li><i className="fab fa-whatsapp"></i>&nbsp;Whatsapp</li>
                            </ul>
                        </div>
                    </div>
                    <p className="copyright">Royality Travels © 2022</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
