import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../hooks/http-hook'
import LoadingSpinner from '../components/UIElements/LoadingSpinner'
import { useSelector } from 'react-redux'
import HistoryCardList from '../components/History/HistoryCardList'
import { useLocation } from 'react-router-dom'

const HistoryPage = () => {
    const loc = useLocation();
    const userData = useSelector((state => state))
    const { isloading, error, sendRequest } = useHttpClient();
    const [historyLoaded, setHistoryLoaded] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/users/${userData.userid}/history`,
                    'GET',
                    null,
                    {
                        Authorization:'Bearer '+userData.token
                    }
                    )
                setHistoryLoaded(responseData.userHist)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [sendRequest, userData.userid,userData.token])
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
                loc.state && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {loc.state}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }
            {
                historyLoaded.length > 0 && (
                    <HistoryCardList list={historyLoaded} />
                ) 
            }
            {
                (historyLoaded.length===0||!historyLoaded)&&!isloading&&
                (
                    <div className='text-danger text-center'>
                        <h1>History Empty</h1>
                        <br /><br /><br /><br />
                        <br /><br /><br /><br />
                        <br />
                    </div>
                )
            }

        </div>

    )
}

export default HistoryPage
