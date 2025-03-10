import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'


const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");
    // const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }

        try {
        const response = await axios.post(new_url, data, { withCredentials: true });
       
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false); // <-- Make sure this is always called on success
                
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An unexpected error occurred.");
        }
        
    }

   
    

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup