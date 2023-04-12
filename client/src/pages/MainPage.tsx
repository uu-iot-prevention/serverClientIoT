import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom';


interface UserStorage {
    username:string|null,
    surname:string|null
}

const MainPage = () => {
const [user] = useState<UserStorage>({username:localStorage.getItem("name"),surname:localStorage.getItem("surname")})
    const [cookies] = useCookies(['token']);


if (!user) {
    return null

}

  return (
    <div>
    {cookies?.token ?  <div>
        <Navbar username={user.username} surname={user.surname} ></Navbar>



    </div>:<Navigate to={"/login"}></Navigate>
    
    }
    </div>
  )
  
}

export default MainPage