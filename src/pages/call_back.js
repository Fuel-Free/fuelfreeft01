import React,{useState} from 'react'
import call_backimg from '../images/callback.png';
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
      <h3>Request a callback</h3>
       <div className='call_backouter-inner'>
        <img src={call_backimg }></img>
        <div className='call_backouter-form'>
            <form onSubmit={submitCallBack}>
            <input type="text" name="name" placeholder="Enter Your Name" required value={formData.name}  onChange={(e)=>handleInputChange(e)}></input>
                <input type='tel' name="number"  pattern="[0-9]{10}" required title='Phone Number'  placeholder="Enter Mobile Number" value={formData.number}  onChange={(e)=>handleInputChange(e)} ></input>
                <input type="time" placeholder='Preferred time' name='preferredTime'  required value={formData.preferredTime}  onChange={(e)=>handleInputChange(e)} ></input>
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
