import React from 'react'

const TopPlacesList = () => {
  return (
    <div className="container">

    <div className="team">
      <div className="container">
         <h1 className="text-center">Top Places</h1>
       <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-12 item">
         <img  className="setpic2 img-fluid" src={require("../../images/Naran.jpeg")}  alt="team"/>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12 item">
            <img  className="setpic2 img-fluid" src={require("../../images/hunza.jpg")}   alt="team"/>
           </div>
           <div className="col-lg-3 col-md-3 col-sm-12 item">
            <img  className="setpic2 img-fluid" src={require("../../images/kalash.jpg")}   alt="team"/>
           </div>
           <div className="col-lg-3 col-md-3 col-sm-12 item">
            <img  className="setpic2 img-fluid" src={require("../../images/margala.jpg")}   alt="team"/>
           </div>
       
       
       </div>
      </div>
     </div>
   </div> 
  )
}

export default TopPlacesList
