import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { getDataFromUrl } from '../helper/helper';


interface UserStorage {
    username:string|null,
    surname:string|null
}

const MainPage = () => {
const [user] = useState<UserStorage>({username:localStorage.getItem("name"),surname:localStorage.getItem("surname")})
    const [cookies] = useCookies(['token']);

    

const getUser = ()=>{

getDataFromUrl("http://localhost:5003/auth/users",cookies.token).then(res=>console.log(res)
)

  
}



if (!user) {
    return null

}

  return (
    <div>
    {cookies?.token ?  <div>
        <Navbar username={user.username} surname={user.surname} ></Navbar>

        <button onClick={getUser}>try Button</button>

        <Outlet></Outlet>

    </div>:<Navigate to={"/login"}></Navigate>
    
    }
    </div>
  )
  
}

export default MainPage