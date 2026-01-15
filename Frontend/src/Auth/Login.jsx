import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useEffect } from 'react';


export default function Login() {
    const { error, loading, response, user } = useSelector((state) => state.auth);
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
            <div className='md:w-[80%] '>
                <h1 className='text-center text-3xl font-bold font-sans mt-25'>Login Here </h1>
                <div className=' mt-10 flex justify-center'>
                    <div className='md:w-[50%] bg-gradient-to-b from-violet-600 via-violet-700 to-violet-800 text-gray-200 shadow-xl rounded-3xl text-center space-y-2 pt-15 p-2 md:p-5'>
                        {error ? <h1 className='text-red-600 font-bold'>{error}</h1> : ""}
                        {loading ? <h1 className='text-yellow-500 font-bold'>Loading....</h1> : ""}
                        {response && (
                            <h1 className='text-green-400 font-bold'>
                                {response.message || ""}
                            </h1>
                        )}
                        <div className='flex justify-center space-x-1 mt-3'>
                            <div className='p-1 md:text-lg w-23 md:w-25 font-bold '><h1 className='float-right'>Email:</h1></div>
                            <input type='text' value={email} placeholder='Enter Email' className='
                             text-black bg-slate-200 border-none outline-0 md:p-1 rounded p-1'
                                onChange={(e) => setemail(e.target.value)}></input>
                        </div>
                        <div className='flex justify-center space-x-1 mt-3'>
                            <div className='p-1 md:text-lg w-23 md:w-25 font-bold '><h1 className='float-right'>Password :</h1></div>
                            <input type='password' value={password} placeholder='Enter Password' className='
                             text-black bg-slate-200 border-none outline-0 md:p-1 rounded p-1'
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
