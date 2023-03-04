import {useState, useEffect, useInsertionEffect}from 'react';
import {useAuth} from "../../context/auth"
import {Outlet} from "react-router-dom"
import  axios  from 'axios';
import Spinner from '../Spinner';


export default function PrivateRoute() {
    const [ok, setOk] = useState(false)

    const [auth,setAuth] = useAuth()

    useEffect(()=> {
        const authCheck = async()=> {
            const res =await axios.get('/api/v1/auth/user-auth',
            // {
            //         // headers: {
            //         //     "Authorization": auth?.token
            //         // }
            //         // we added headers in auth.js file insted of ther
            // }
            )
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token]);

    return ok ? <Outlet/>:<Spinner /> 
}