import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AuthPage from "./pages/AuthPage";
import TripsPage from "./pages/TripsPage";
import MainNavigation from "./components/Navigation/MainNavigation";
import { useSelector,useDispatch } from 'react-redux';
import { Login } from "./redux/actions/loggedIn";
import Footer from "./components/Footer/Footer";
import HistoryPage from "./pages/HistoryPage";
import WishlistPage from "./pages/WishlistPage";
import EditProfile from "./pages/EditProfile";
import Ratings from "./pages/Ratings";
import TopRated from "./pages/TopRated";
import ErrorPage from "./pages/ErrorPage";
import React,{useEffect} from 'react';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem('userStatus'));
    if(storedData)
    {
      if(storedData.token)
      {
        dispatch(Login(
          storedData.name, storedData.email, storedData.userid, storedData.token
      ))
      }
    }
  },[dispatch])

  const userData = useSelector((state => state))
  let routes;
  if(userData.login){
    routes=(
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="/:pid/booking" element={<BookingPage/>}/>
      <Route path="/trip" element={<TripsPage/>}/>
      <Route path='/:uid/history' element={<HistoryPage/>} />
      <Route path='/:uid/wishlist' element={<WishlistPage/>} />
      <Route path="/:pid/rating" element={<Ratings/>}/>
      <Route path="/toprated" element={<TopRated/>}/>
      <Route path="/edit" element={<EditProfile/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>)
  }
  else
  {
    routes=(
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="/trip" element={<TripsPage/>}/>
      <Route path="/toprated" element={<TopRated/>}/>
      <Route path="/auth" element={<AuthPage/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>)
  }
  return (
    <BrowserRouter>
    <MainNavigation/>
    <main>
    {routes}
    </main>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
