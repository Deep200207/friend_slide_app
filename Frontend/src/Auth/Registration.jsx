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
    <div className="flex justify-center p-20">
      <div className="w-[100%]">
        <h1 className="text-center text-3xl font-bold font-serif text-white text-shadow-lg mt-5">
          Register Here
        </h1>

        <div className="mt-10 flex justify-center">
          <div
            className="md:w-[50%] bg-gray-800 rounded-3xl text-center space-y-5 pt-10 p-5"
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
              <h1 className="text-lg md:text-xl w-23 md:w-25 font-bold">Name :</h1>
              <input
                type="text"
                value={name}
                placeholder="Enter Name"
                className="bg-gray-600 rounded border-none outline-0 p-1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex justify-center space-x-1">
              <h1 className="text-lg md:text-xl w-23 md:w-25 font-bold">Email :</h1>
              <input
                type="text"
                value={email}
                placeholder="Enter Email"
                className="bg-gray-600 border-none outline-0 p-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex justify-center space-x-1">
              <h1 className="text-lg md:text-xl w-23 md:w-25 font-bold">Password :</h1>
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                className="bg-gray-600 border-none outline-0 p-1"
                onChange={(e) => setPassword(e.target.value)}
              />
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
