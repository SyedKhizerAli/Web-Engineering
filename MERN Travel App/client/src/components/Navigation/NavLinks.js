import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../FormElements/Button'
import { Logout } from '../../redux/actions/loggedout'
import { useNavigate } from 'react-router-dom';

import './NavLinks.css';

export default function NavLinks(props) {
  const navigate = useNavigate()
  const logoutHandler = () => {
    dispatch(Logout())
    localStorage.removeItem('userStatus');
    navigate('/', { replace: true })
  }

  const loginState = useSelector((state => state))
  const dispatch = useDispatch();
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/trip'>Trips</NavLink>
      </li>
      <li>
        <NavLink to='/toprated'>Top Rated</NavLink>
      </li>
      {
        loginState.login&&(
          <li>
          <NavLink to={`/${loginState.userid}/history`}>History</NavLink>
        </li>
        
        )
      }
     {
      loginState.login&&(
        <li>
        <NavLink to={`/${loginState.userid}/wishlist`}>Wishlist</NavLink>
      </li>
      )
     }
      {
      loginState.login&&(
        <li>
        <NavLink to={'/edit'}>Edit Profile</NavLink>
      </li>
      )
     }
     
      {
        !loginState.login && (
          <li>
            <NavLink to='/auth'>Login</NavLink>
          </li>
        )
      }
      {
        loginState.login&& (
          <li>
            <Button onClick={logoutHandler}>LOGOUT</Button>
          </li>
        )
      }
      {
        loginState.login&&(
          <li className='text-light'>Welcome {loginState.name}</li>
        )
      }

    </ul>
  )
}
