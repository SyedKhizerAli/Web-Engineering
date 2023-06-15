import React, { useEffect,useState } from 'react'
import { useHttpClient } from '../hooks/http-hook'
import LoadingSpinner from '../components/UIElements/LoadingSpinner'
import { useSelector } from 'react-redux'
import WishlistCardList from '../components/Wishlist/WishlistCardList';

const WishlistPage = () => {
    const userData = useSelector((state => state))
    const { isloading, error, sendRequest } = useHttpClient();
    const [wishlistLoaded,setwishlistLoaded]=useState([]);
    const onDelete=(id)=>{
        setwishlistLoaded((prev)=>{
            return prev.filter(p=>p._id!==id)
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/users/${userData.userid}/wishlist`,
                    'GET',
                    null,
                    {
                        Authorization:'Bearer '+userData.token
                    }
                    )
                setwishlistLoaded(responseData.userWish)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[sendRequest,userData.userid,userData.token])

    return (
        <div>
            {
                error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }
            {
                isloading && (
                <div className='text-center'>
                <LoadingSpinner />
                </div>
                )
            }
            {
                wishlistLoaded.length>0&&(
                    <WishlistCardList list={wishlistLoaded} onDelete={onDelete} />
                )
            }
            {
                wishlistLoaded.length===0&&!isloading&&(
                    <div className='text-danger text-center'>
                       <h1>Wishlist Empty</h1>
                       <br/><br/><br/><br/>
                       <br/><br/><br/><br/>
                       <br/>
                    </div>
                )
            }
            
        </div>

    )
}

export default WishlistPage
