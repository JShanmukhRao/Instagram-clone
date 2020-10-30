






















/*import React , {useState} from 'react'
import axios from 'axios'
const EmployePost =()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [city,setCity]=useState("")
    const [birth,setBirth]=useState("")
  const  submitHandler=()=>{
    console.log("POST")
    if(!name || !email || !phone ||!city || !birth)
    {
       alert("Enter all fields");
    }
    else{

      const employee={
        name: name,
        email: email,
        phone:phone,
        city:city,
        birth:birth

      }
      axios.post('https://localhost:5000/form', employee)
      .then(function (response) {
        console.log(response);
      })
      .catch(err=>{
        console.log(err)
      })
      console.log("POST2")
    }
  
    }
    return(
        <div>
            <div className="mycard">
           <div className="card auth-card input-field ">
               <h2>Employe Details</h2>
               <input   
                 type="text"
                 placeholder="Name"
                 onChange={(e)=>setName(e.target.value)}
                 value={name}
               /> 
               <input   
                 type="email"
                 placeholder="Email"
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
               /> 
                <input   
                 type="text"
                 placeholder="Phone Number"
                 onChange={(e)=>setPhone(e.target.value)}
                 value={phone}
               /> 
               <input   
                 type="text"
                 placeholder="City"
                 onChange={(e)=>setCity(e.target.value)}
                 value={city}
               /> 
                <input   
                 type="Date"
                 placeholder="Date of Birth"
                 onChange={(e)=>setBirth(e.target.value)}
                 value={birth}
               /> 

                 <button onClick={()=>submitHandler()}  className="btn waves-effect waves-light blue lighten-2" type="submit"  >Submit
                 </button>
                 <br></br>
                

            </div>
      </div>    )
        </div>
    )
}
export default EmployePost;
*/


/*


import React from "react"

const Profile = ()=>{
    return(
       <div className="auth-card2" >
           <button style={{margin: "8px"}} className="btn waves-effect waves-light blue lighten-2" type="submit"  >Shubham 
               shubham@gmail.com
                 </button>
<br></br>
                 <button style={{margin: "8px"}} className="btn waves-effect waves-light blue lighten-2" type="submit"  >rahul
               rahul@gmail.com
                 </button>
                 <br></br>

                 <button style={{margin: "8px"}} className="btn waves-effect waves-light blue lighten-2" type="submit"  >shanmukh
               shanmukh@gmail.com
                 </button>
                 <br></br>

                 <button style={{margin: "8px"}} className="btn waves-effect waves-light blue lighten-2" type="submit"  >mike
               mike@gmail.com
                 </button>
                 <br></br>

                 <button style={{margin: "8px"}} className="btn waves-effect waves-light blue lighten-2" type="submit"  >nikhil
               nikhil@gmail.com
                 </button>
       </div>
    )
}
export default Profile;
*/