import { useState } from "react";

function NewRequest(){

  const [name,setName] = useState("");
  const [hospital,setHospital] = useState("");
  const [date,setDate] = useState("");
  const [urgency,setUrgency] = useState("");

  const submitRequest = (e)=>{
    e.preventDefault();
    alert("Care Companion request submitted!");
  };

  return(
    <div>

      <h2>Request a Care Companion</h2>

      <form onSubmit={submitRequest} style={{marginTop:"20px"}}>

        <input
          placeholder="Elderly Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Hospital / Place"
          value={hospital}
          onChange={(e)=>setHospital(e.target.value)}
        /><br/><br/>

        <input
          type="datetime-local"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        /><br/><br/>

        <select
          value={urgency}
          onChange={(e)=>setUrgency(e.target.value)}
        >
          <option>Select Urgency</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <br/><br/>

        <button type="submit">Submit Request</button>

      </form>

    </div>
  )
}

export default NewRequest