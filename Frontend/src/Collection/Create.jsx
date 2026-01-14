// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addfrnd } from '../features/frndSlice';

// export default function Create() {
//   const [name, setName] = useState("");
//   const [relationship, setRelationship] = useState("");
//   const [gender, setGender] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [notes, setNotes] = useState("");
//   const dispatch = useDispatch();
//   const {response ,error}=useSelector((state)=>state.friend);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const user = JSON.parse(localStorage.getItem("slide_user"));
//     const address = user.data.email;
//     console.log(address);

//     if (!address || !name || !relationship || !dob || !phone) {
//       alert("All field is required")
//     }
//     dispatch(addfrnd({address, name, relationship, gender, dob, phone, email, notes}));
//     setName("");
//     setEmail("");
//     setGender("");
//     setDob("");
//     setNotes("");
//     setPhone("");
//     setRelationship("");
//   }

//   return (
//     <div className="mt-20 px-3 mb-10">
//       <div className="flex justify-center">
//         <div
//           className="w-full sm:w-[90%] md:w-[60%] lg:w-[50%] text-gray-900 rounded-2xl text-center bg-slate-300 p-4"
//         >
//           <h1 className="text-xl sm:text-2xl font-bold mt-2" id="create-heading">
//             Make your card and add your <em id="text-style">LOVE</em> one
//           </h1>
//           <h1 className="mt-1 font-semibold text-base sm:text-lg">
//             Add Friends or Relatives
//           </h1>
//           {response && <p className='text-green-700 font-bold m-2'>{response}</p>}
//           {error && <p className='text-red-600 font-bold m-2'>{error}</p>}
//           <form className="mt-4 m-6 space-y-4">
//             <div className="bg-violet-600 rounded-2xl p-4 text-white">
//               <div className="space-y-3">
//                 {/* Full Name */}
//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Full Name:</label>
//                   <input
//                     value={name}
//                     type="text"
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200"
//                     placeholder="Enter the Name"
//                     onChange={(e) => { setName(e.target.value) }}
//                   />
//                 </div>

//                 {/* Relationship */}
//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Relationship:</label>
//                   <input
//                     value={relationship}
//                     type='text'
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200"
//                     placeholder="like cousin, friend etc"
//                     onChange={(e) => setRelationship(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Gender:</label>
//                   <input
//                     value={gender}
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200"
//                     placeholder="Male or female"
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Date of Birth:</label>
//                   <input
//                     value={dob}
//                     type="text"
//                     placeholder='Date DD/MM/YYYY'
//                     onChange={(e) => setDob(e.target.value)}
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200"
//                   />
//                 </div>

//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Phone:</label>
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200"
//                     placeholder="Enter the Mobile No"
//                   />
//                 </div>
//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Email:</label>
//                   <input
//                     value={email}
//                     type="text"
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200"
//                     placeholder="Add Mail"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex flex-col text-left">
//                   <label className="font-semibold mb-1">Add Notes:</label>
//                   <textarea
//                     value={notes}
//                     className="bg-violet-500 rounded text-sm sm:text-base p-2 outline-0 border-0 placeholder-gray-200 h-20"
//                     placeholder="Add special notes here..."
//                     onChange={(e) => setNotes(e.target.value)}
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-center">
//                 <button
//                   type='submit'
//                   className="bg-fuchsia-500 hover:bg-pink-500 cursor-pointer py-2 px-4 w-full sm:w-32 font-bold rounded-xl"
//                   onClick={handleSubmit}>
//                   Create
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
import React from 'react'

export default function Create() {
  return (
    <div>
      <div>
          
      </div>
    </div>
  )
}

