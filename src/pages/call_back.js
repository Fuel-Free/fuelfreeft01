import React,{useState} from 'react'
import call_backimg from '../images/vector-request-call.png';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const Call_back = () => {

  const initialFormState = {
    name: "",
    number:"",
    preferredTime:""
    
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitCallBack = async(e) => {
    e.preventDefault();
    console.log(formData)
    let res=await axios.post(`https://app.fuelfree.in/request/forcall`,formData,{
      headers:{
        "Accept":"application/json"
      }
    })
    let result=await res.data
    if(result.success==='success'){
      toast.success('We will contact you soon')
    }
   };
  return (
    <div className='call_section'>
    <ToastContainer/>
      <div className='tanker'>
      <div className='csll-outer-back'>
      
       <div className='call_backouter-inner'>
        <img src={call_backimg }></img>
        <div className='call_backouter-form'>
        <h3>Request a callback</h3>
            <form onSubmit={submitCallBack}>
            <label>Enter Your Name</label>
            <input type="text" name="name" placeholder="" required value={formData.name}  onChange={(e)=>handleInputChange(e)}></input>
            <label>Enter Mobile Number</label>
                <input type='tel' name="number"  pattern="[0-9]{10}" required title='Phone Number'  placeholder="" value={formData.number}  onChange={(e)=>handleInputChange(e)} ></input>
                <div className="time-div-text">
                <label>Preferred Time</label>
                <input type="time" placeholder='Preferred time' name='preferredTime'  required value={formData.preferredTime}  onChange={(e)=>handleInputChange(e)} ></input>
                </div>
                <button type='submit'  >Send Request</button>
            </form>
        </div>
        </div>
       </div>
      </div> 

      </div>
    
  )
}

export default Call_back
