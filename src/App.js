import './App.css';
import React, {useEffect} from "react"
import Axios  from 'axios';

function App() {

  const [foodName,setFoodName]= React.useState("");
  const [days,setDays]=React.useState(0);
  const [foodList,setFoodList]=React.useState([]);
  const [newFoodName,setNewFoodName]= React.useState("");
  
  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then(response =>{
      setFoodList(response.data);
    })
  })


  const addTolist=()=>{
    Axios.post('http://localhost:3001/insert',{foodName:foodName,days:days})
  }

  const updateFood=(id)=>{
    Axios.put("http://localhost:3001/update",{id:id,newFoodName:newFoodName})
  }

  const deleteFood=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
      <div className='App'>
        <div className='con'>
        <h1>CRUD REACT APP</h1>
        <label>Emp name:</label>
        <input type="text" onChange={(event)=>{
          setFoodName(event.target.value);
        }} />
        <br/>
        <br/>
        <label>Age</label>
        <input type="number" onChange={(event)=>{
          setDays(event.target.value);
        }}  />
        <br/>
        <br/>
        <button onClick={addTolist}>Add to list</button>
        </div>
        <hr/>
        {
          foodList.map((val, key)=>{
            return <div key={key}> 
              <h1>{val.foodName}</h1>
              <h1>{val.daysSinceIAte}</h1>
              <input type="text" placeholder='new Food..'  onChange={(event)=>{
          setNewFoodName(event.target.value);
        }} />
              <button onClick={()=>updateFood(val._id)}>Update</button>
              <button onClick={()=>deleteFood(val._id)}>Delete</button>
            </div>
          })
        }
        </div>
    );
}

export default App;
