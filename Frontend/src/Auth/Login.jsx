import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useEffect } from 'react';


export default function Login() {
    const { error, loading,response ,user} = useSelector((state) => state.auth);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispath = useDispatch();
    // const navigate = useNavigate();
    const handleSubmit = () => {
        dispath(loginUser({ email, password }));
        // dispath(saveUser({}))
        }
    return (
        <div className='flex justify-center '>
            <div className='w-[80%] '>
                <h1 className='text-center text-3xl font-bold font-sans 
      mt-15 ' style={{textShadow:"textShadow: 2px 2px 5px blue"}}>Login Here</h1>
                <div className=' mt-10 flex justify-center'>
                    <div className='w-[60%] bg-slate-800 text-gray-200   md:w-[50%] shadow-xl rounded-3xl text-center space-y-2 pt-15 p-5'>
                        {error ? <h1 className='text-red-600 font-bold'>{error}</h1> : ""}
                        {loading? <h1 className='text-yellow-500 font-bold'>Loading....</h1> :""}
                        {response && (
                            <h1 style={{ color: "green" }}>
                                {response.message || ""}
                            </h1>
                        )}
                        <div className='flex justify-center space-x-1'>
                            <div className='text-sm md:text-lg  w-[60%] md:w-25 font-bold '><h1 className='float-right' >Email :</h1></div>
                            <input type='text' value={email} placeholder='Enter Email' className='text-black border-none outline-0 bg-slate-300 rounded
                            p-1' onChange={(e) => setemail(e.target.value)}></input>
                        </div>
                        <div className='flex justify-center space-x-1 mt-3'>
                            <div className='text-lg md:text-lg w-23 md:w-25 font-bold '><h1 className='float-right'>Password :</h1></div>
                            <input type='password' value={password} placeholder='Enter Password' className='text-black bg-slate-300 border-none outline-0 p-1 rounded'
                                onChange={(e) => setpassword(e.target.value)}></input>
                        </div>
                        <div>
                            <button className='bg-emerald-600 mt-5 hover:bg-emerald-500 font-bold text-lg md:text-lg p-2 w-20 md:w-20 rounded-lg md:rounded-xl cursor-pointer
                            ' onClick={handleSubmit}>Submit</button>
                            <div className='mt-5'>
                                Don't have account ? <p className='text-cyan-500 font-bold'><NavLink to={"/reg"}>Sign-up</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
