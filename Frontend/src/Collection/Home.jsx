import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { SiSlides } from "react-icons/si";
// import { FiSend } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [selected, setSelected] = useState([]); // array of selected user(s)
  const [auth, setAuth] = useState(false);
  const searchTerm = useSelector(state => state.search.term);
  const { frndsList } = useSelector(state => state.friend)
  const user = JSON.parse(localStorage.getItem("slide_user"));

  const filterUser = slides.filter(s =>
    (s?.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  const toggle = (email) => {
    const newSelected = frndsList.filter(s => s.email === email);
    setSelected(newSelected);
  }

  return (
    <>
      <div className='font-bold '>
        <div className='flex flex-col md:flex-row  w-full'>
          <div className='md:w-[40%] mt-20'>
            {frndsList.length > 0 ? <h1 className='text-xl font-bold m-2 '>Your Friends</h1> : ""}
            {frndsList.length > 0 ? (
              frndsList.map((data, i) => {

                return (
                  <div className='border-b-2 bg-purple-800' key={i}>
                    <div>
                      <button className='cursor-pointer  hover:bg-violet-900 w-full p-2 ' onClick={() => toggle(data?.email)}>
                        <div className='flex'>
                          <div style={{ backgroundImage: `url(${data?.pic})` }} className='w-15 h-15 bg-cover bg-center rounded-full'></div>
                          <h1 className='mt-3 m-1 p-1'>{data.name}</h1>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <>
                <div className='md:flex justify-center h-150 items-center w-full '>
                  <div className='w-full md:w-[100%] text-center md:m-20  float-right mt-20 md:mt-10'>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl font-sans'>A New Way</h1>
                    <div className='flex justify-center'>
                      <div className='flex space-x-3 text-3xl md:text-4xl lg:text-5xl font-sans mt-2'>
                        <h1>to</h1> <h1 className='text-amber-400 text-shadow-lg text-shadow-orange-600'>FlashCard..</h1>
                      </div>
                    </div>
                    <div className='mt-10  justify-center space-x-2 text-xl lg:text-2xl'>
                      {user ? <>
                        <div className='flex justify-center space-x-2'>
                          <h1>Hello.. </h1> <h1 className='text-amber-300 text-shadow-amber-700 text-shadow-lg'>{user.data.name}</h1>
                        </div>
                        <div className='mt-7'>
                          <NavLink to={"/create"} className='lg:text-xl text-lg bg-amber-600 m-2  p-2 cursor-pointer hover:bg-amber-700 rounded-2xl'>Add Your Friends +</NavLink>
                        </div>
                      </> :
                        <>
                          <div className='flex justify-center items-center'>
                            <SiSlides className='md:hidden w-[40%] h-[40%] p-5 bg-orange-400 text-violet-900 rounded mb-15'></SiSlides>
                          </div>

                          <NavLink to={"/reg"} className='text-lg bg-amber-500 p-2 cursor-pointer rounded-2xl '>Sign-up</NavLink>
                        </>
                      }
                    </div>
                  </div>
                  <div className=' w-[60%] mt-40 hidden  md:flex justify-center items-center'>
                    {/* optional icon */}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='md:w-[60%] mt-17  '>
            {user ? (
              <>
                {selected.length > 0 ? (
                  <div className='border-l-2 p-2'>
                    <div className='flex bg-purple-950 '>
                      <div>
                        <div style={{ backgroundImage: `url(${selected[0]?.pic})` }} className='w-15 h-15 bg-cover bg-center rounded-full m-1' />
                      </div>
                      <h1 className='m-2 mt-5'>{selected[0]?.name}</h1>
                    </div>
                    <div className='w-full h-111 border-b-1 bg-purple-700'>

                    </div>
                    <div className='flex p-1'>
                      <input type="text" className='w-[90%] h-12 float-left p-2 bg-violet-900 border-1 rounded-xl outline-0 ' />
                      <LuSendHorizontal className='w-12 h-12 bg-violet-950 text-amber-400 p-1 ml-1 rounded-full' />
                    </div>
                  </div>

                ) : frndsList.length > 0 ? (
                  <div className='flex justify-center items-center h-130 '>
                    <div className='text-center'>
                      <h1 className='text-4xl m-2'>Chat Here </h1>
                      <h1 className='text-lg m-1'>Click on friends list </h1>
                      <h1 className='text-lg'>to chat </h1>
                    </div>
                  </div>
                ) : <div>
                  <div className='flex justify-center items-center h-130'>
                    <div className='bg-gradient-to-b from-white via-purple-200 to-purple-300 bg-clip-text text-transparent'>
                      <h1 className='font-bold text-2xl m-5'>No friends Added yet</h1>
                      <h1 className=' text-lg text-center '>Add Your Friends</h1>
                      <h1 className=' text-lg text-center'>Chat with your friends</h1>
                    </div>
                  </div>
                </div>}
              </>
            ) : (
              <div className='mt-20  p-2 hidden md:flex justify-center items-center w-full  h-130'>
                <SiSlides className='w-70 h-70 p-5 bg-orange-400 text-violet-700 rounded-xl'></SiSlides>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
