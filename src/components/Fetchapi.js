import React, { useEffect, useState } from 'react'




export default function Fetchapi() {
    const [user, setUser] = useState([])
    const fetchingData =()=>{
        fetch("https://course-api.com/react-tours-project").then(reponse =>{return reponse.json()}).then(data=>{setUser(data)})
    }

    useEffect(()=>{
        fetchingData()
    },[])
    console.log(user)

  return (
    <div>
        {user.map(users=>(
            <h1>Name: {users.name}</h1>
        ))}
    </div>
  )
}
