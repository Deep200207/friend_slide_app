import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendUser, signupfail } from '../features/authSlice';

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { error, loading, response } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (!name || !email || !password) {
      dispatch(signupfail("All field Requried"))
      return;
    }
    dispatch(sendUser({ name, email, password }));
  };

  // Clear form after successful response
  useEffect(() => {
    if (response) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [response]);

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <h1 className="text-center text-3xl font-bold font-serif text-white text-shadow-lg mt-10">
          Register Here
        </h1>

        <div className="mt-[30%] sm:mt-20 flex justify-center w-full">
          <div
            className=" md:w-[50%] bg-gradient-to-b from-violet-600 via-violet-700 to-violet-800 rounded-3xl text-center space-y-5  p-2 md:p-5"
          >
            {/* Loading */}
            {loading && <h1 style={{ color: "yellow" }}>Loading...</h1>}

            {/* Error */}
            {error && <h1 style={{ color: "red" }}>{error}</h1>}

            {/* Success */}
            {response && (
              <h1 style={{ color: "lightgreen" }}>
                {response.message || "Registered Successfully!"}
              </h1>
            )}

            <div className="flex justify-center space-x-1">
              <div className='md:text-lg  w-[60%] md:w-25 font-bold '>
                <h1 className="float-right">Name :</h1>
              </div>
              <input
                type="text"
                value={name}
                placeholder="Enter Name"
                className="bg-slate-200 text-black rounded border-none outline-0 p-1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex justify-center space-x-1'>
              <div className=' p-1  md:text-lg  w-[60%] md:w-25 font-bold '>
                <h1 className='float-right' >Email :</h1>
              </div>
              <input type='text' value={email} placeholder='Enter Email'
                className='text-black border-none outline-0 bg-slate-200 rounded
               p-1' onChange={(e) => setEmail(e.target.value)}>

              </input>
            </div>
            <div className='flex justify-center space-x-1 mt-3'>
              <div className='p-1  md:text-lg w-23 md:w-25 font-bold '><h1 className='float-right'>Password :</h1></div>
              <input type='password' value={password} placeholder='Enter Password' className='
                             text-black bg-slate-200 border-none outline-0 md:p-1 rounded p-1'
                onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div>
              <button
                className="bg-emerald-600 hover:bg-emerald-500 font-bold text-lg md:text-xl p-2 w-20 md:w-25 rounded-xl md:rounded-2xl cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <div className="mt-5">
                Already have account ?{" "}
                <p className="text-cyan-500 font-bold">
                  <NavLink to={"/login"}>Login here</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
