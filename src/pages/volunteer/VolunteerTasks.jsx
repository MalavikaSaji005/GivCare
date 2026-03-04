import { useState } from "react";

function VolunteerTasks(){

  const tasks = [
    {id:1,name:"Teaching Session"},
    {id:2,name:"Medical Camp"},
    {id:3,name:"Workshop"}
  ];

  const [applied,setApplied] = useState([]);

  const applyTask = (task) => {
    if(!applied.includes(task.id)){
      setApplied([...applied,task.id]);
      alert("Applied for "+task.name);
    }
  };

  return(
    <div>

      <h2>Find Volunteer Opportunities</h2>

      <div style={{marginTop:"20px"}}>

        {tasks.map(task=>(
          <div key={task.id} style={card}>

            <span>{task.name}</span>

            <button onClick={()=>applyTask(task)}>
              {applied.includes(task.id) ? "Applied":"Apply"}
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}

const card={
  background:"#f5f7fb",
  padding:"15px",
  borderRadius:"8px",
  marginBottom:"10px",
  display:"flex",
  justifyContent:"space-between"
}

export default VolunteerTasks