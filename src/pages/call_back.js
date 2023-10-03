import React from 'react'
import call_backimg from '../images/callback.png';

const call_back = () => {
  return (
    <div className='call_section'>
      <div className='tanker'>
      <div className='csll-outer-back'>
      <h3>Request a callback</h3>
       <div className='call_backouter-inner'>
        <img src={call_backimg }></img>
        <div className='call_backouter-form'>
            <form>
                <input placeholder='Name'></input>
                <input placeholder='Phone no'></input>
                <input placeholder='Preferred time'></input>
                <button>Send Request</button>
            </form>
        </div>
        </div>
       </div>
      </div> 

      </div>
    
  )
}

export default call_back
