import { useState } from 'react'
import { Link } from 'react-router-dom';

// Icons
import { FaUser } from "react-icons/fa";

// CSS Links
import  "../App.css"

export const LandPage = () => {
return (
    <>
     <section className="centred-contents">
      <h1>Karibu, upatu 2026 wekeza hapa </h1>

       <div className='discription_head'>
        <p>Cheza upatu na sisi ili kupatu faida ya haraka. Karibu katika kikundi chetu cha upatu upate kufaidika.</p>
       </div>

       <div className="button">
        <Link to="/signup">
          <button className='button-blue'>
              <FaUser/>
              Jiunge Sasa
          </button>
        </Link>
       
       </div>
       
     </section>

     <section className="flex-pesa">
      <Link to="/signup">
       Go to Sign up
      </Link>
     </section>
    </>
  )
}
