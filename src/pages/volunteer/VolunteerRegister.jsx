import { useState } from "react";

function VolunteerRegister() {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [skills,setSkills] = useState("");
  const [location,setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Volunteer Registered!");
  };

  return (
    <div>
      <h2>Volunteer Registration</h2>

      <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Skills (Teaching, Medical etc)"
          value={skills}
          onChange={(e)=>setSkills(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        /><br/><br/>

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default VolunteerRegister;