import React from 'react';

export default function Subscribe() {
  return (
    <div className='subscribe'>
        <h1>Subscribe to our newsletter</h1>
        <p>Like what you see? Subscribe now to get the latest updates about our products <br />
        and offers, experience first hand special offers and coupons weekly</p>
        <form action="" className='sub-form'>
          <div>
            <input type="text" placeholder='Name'/>
            <input type="text" placeholder='Surname'/>
          </div>
          <div>
            <div className='sub-submit'>
              <input type="email" placeholder='Email'/>
              <button>Submit</button>
            </div>
          </div>
        </form>
    </div>
  );
}
