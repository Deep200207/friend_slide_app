import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import man_dp from "../assets/man-dp.jpg";
import women_dp from "../assets/women.jpg";
import { updateUser } from '../features/updateSlice';

function Update() {
  const [toggle, setToggle] = useState(null);
  const [slides, setSlides] = useState([]);
  const searchTerm = useSelector(state => state.search.term);
  const [profile, setProfile] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [response, setResponse] = useState("");
  const res = useSelector(state => state.update.response);

  // Run once on mount
  // useEffect(() => {
  //   const userRaw = localStorage.getItem("slide_user");
  //   if (!userRaw) return;
  //   const user = JSON.parse(userRaw);
  //   const emailFromStorage = user?.data?.email;
  //   if (!emailFromStorage) return;

  //   fetch(`http://localhost:3000/view?email=${encodeURIComponent(emailFromStorage)}`)
  //     .then(r => r.json())
  //     .then(data => {
  //       // expect data.data to be an array
  //       if (Array.isArray(data.data)) setSlides(data.data);
  //     })
  //     .catch(err => {
  //       console.error("Fetch error:", err);
  //     });
  // }, []); // <- empty deps so it runs once

  const filteredSlides = slides.filter(s =>
    s.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const filterProfile = slides.filter(item => item.email === profile);

  const handleSubmit = () => {
    // dispatch update
    dispatch(updateUser({ name, gender, relationship, dob, phone, email, notes }));
    // set response from redux (res might update later)
    setResponse(res || "");
  };

  const toggleProfile = (index, email) => {
    setToggle(prev => (prev === index ? null : index));
    const selected = slides.find(item => item.email === email);
    if (selected) {
      setName(selected.name || "");
      setEmail(selected.email || "");
      setDob(selected.dob || "");
      setGender(selected.gender || "");
      setPhone(selected.phone || "");
      setNotes(selected.notes || "");
      setRelationship(selected.relationship || "");
    }
    setProfile(prev => (prev === email ? null : email));

    // focus after state updates (next tick)
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);

    setResponse("");
  };

  return (
    <div className='flex '>
      <div className='mt-25 text-white w-full'>
        <div className='text-center text-2xl text-orange-400 font-semibold mb-10 mt-2 md:mt-0 md:mb-0'>Update Your Cards</div>
        <div className='grid md:grid-cols-4 gap-4 m-2 md:m-5 '>
          {filteredSlides.length > 0 ? (
            filteredSlides.map((data, i) => {
              const genderLower = (data.gender || "").toLowerCase();
              const photo = genderLower === "male" ? man_dp : women_dp;
              const istoggle = toggle === i;
              return (
                <div key={i} className='md:mt-10 border-2 border-violet-400 bg-violet-900 p-2 md:p-5'>
                  <div className='h-15 md:h-25 flex justify-center'>
                    <div className='h-12 md:h-20 rounded-full bg-cover bg-center w-12 md:w-20 p-2 mt-2'
                      style={{ backgroundImage: `url(${photo})` }}>
                    </div>
                  </div>
                  <div className='text-center'>
                    <h1 className='font-bold'>{data.name}
                      <br />
                      <p className='text-sm font-normal'>{data.gender}</p>
                    </h1>
                    <h1 className='text-orange-400 text-xl font-semibold'>{data.relationship}</h1>
                    <h1 className='text-sm'>DOB: {data.dob}</h1>
                    <h1 className='text-sm'>Phone no: {data.phone}</h1>
                    <h1 className='text-sm'>Email : {data.email}</h1>
                    <button className='mt-1 md:mt-2 p-1 md:p-2 bg-orange-400 rounded-2xl font-bold cursor-pointer hover:bg-orange-500'
                      onClick={() => toggleProfile(i, data.email)}
                    >
                      {istoggle ? <h1 className='text-sm md:text-lg'>Hide Profile</h1> : <h1 className='text-sm md:text-lg'>Show Profile</h1>}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-center'>No result found</div>
          )}
        </div>
      </div>

      {profile ? (  
        filterProfile.map((data, i) => {
          const genderLower = (data.gender || "").toLowerCase();
          const photo = genderLower === "male" ? man_dp : women_dp;
          return (
            <div key={i} className='w-[55%] md:w-[40%] flex justify-center rounded-xl mt-15 md:mt-19 border-2 p-3'>
              <div className='text-white text-center'>
                <h1 className='font-bold md:text-2xl'>Profile Section</h1>
                <h1 className='text-green-500'>{response?.message}</h1>
                <div className='flex justify-center mt-5'>
                  <div className=' w-[50%] md:w-20 rounded-full h-15 md:h-18 border-violet-600 bg-cover bg-center'
                    style={{ backgroundImage: `url(${photo})` }}></div>
                </div>

                <div className='mt-5 md:m-3 space-y-2 grid '>
                  <div className='w-[100%] md:flex md:space-x-1 md:justify-end'>
                    <h1 className='mt-1 text-sm md:text-lg'>Name :</h1>
                    <input ref={inputRef} type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div className='w-[100%] md:flex md:space-x-1 md:justify-end'>
                    <h1 className='mt-1 text-sm md:text-lg'>Gender :</h1>
                    <input type="text" placeholder='gender' value={gender} onChange={(e) => setGender(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div className='w-[100%] md:flex md:space-x-1 md:justify-end'>
                    <h1 className='mt-1 text-sm md:text-lg'>Relation :</h1>
                    <input type="text" placeholder='name' value={relationship} onChange={(e) => setRelationship(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div className='w-[100%] md:flex md:space-x-1 md:justify-end'>
                    <h1 className='mt-1 text-sm md:text-lg'>DOB :</h1>
                    <input type="text" placeholder='name' value={dob} onChange={(e) => setDob(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div className='w-[100%] md:flex md:space-x-1 md:justify-end'>
                    <h1 className='mt-1 text-sm md:text-lg'>Phone :</h1>
                    <input type="text" placeholder='name' value={phone} onChange={(e) => setPhone(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div className='w-[100%] md:flex md:space-x-1 md:justify-end'>
                    <h1 className='mt-1 text-sm md:text-lg'>email :</h1>
                    <input type="text" placeholder='name' value={email} onChange={(e) => setEmail(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div className='md:flex md:justify-end w-[100%] '>
                    <h1 className='mt-1 text-sm md:text-lg'>Notes :</h1>
                    <textarea placeholder='notes' value={notes} onChange={(e) => setNotes(e.target.value)} className='text-orange-500 bg-purple-950 p-1 rounded-xl text-sm md:text-lg outline-0 w-[90%] md:w-[65%]' />
                  </div>

                  <div>
                    <button className=' w-[50%] md:w-[30%] bg-orange-400 hover:bg-amber-500 rounded-2xl p-2 font-bold' onClick={handleSubmit}>Update</button>
                  </div>
                </div>

              </div>
            </div>
          );
        })
      ) : null}
    </div>
  );
}

export default Update;
