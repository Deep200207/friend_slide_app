import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import man_dp from "../assets/man-dp.jpg";
import women_dp from "../assets/women.jpg";

export default function View() {
  const [slides, setSlides] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const searchTerm = useSelector(state => state.search.term); // get search term from Redux store 

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("slide_user"));
  //   const email = user.data.email;
  //   try {
  //     fetch(`http://localhost:3000/view?email=${encodeURIComponent(email)}`)
  //       .then(res => res.json())
  //       .then(data => setSlides(data.data));
  //   } catch (err) {
  //     console.log("No data found")
  //   }
  // }
  //   , []);


  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter slides based on Redux search term
  const filteredSlides = slides.filter(slide =>
    slide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className='mt-25 text-center font-bold text-3xl text-amber-400 font-sans'>Your Cards</h1>
      <div className='grid md:grid-cols-4 gap-4 m-10'>
        {filteredSlides.length > 0 ? (
          filteredSlides.map((data, i) => {
            const gender = data.gender.toLowerCase();
            const profile = gender === "male" ? man_dp : women_dp;
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={i}
                className={`mt-10 bg-violet-900 border-2 border-violet-400 rounded-xl `}
                style={{ boxShadow: "0px 0px 20px rgba(0,0,0,0.2)", height: isExpanded ? "auto" : "300px" }}
              >
                <div className='h-25 flex justify-center'>
                  <div className='h-20 items-center w-20 p-2 rounded-full bg-center bg-cover mt-2'
                    style={{ backgroundImage: `url(${profile})` }} />
                </div>
                <div className='text-center p-1'>
                  <h1 className='text-xl font-bold'>
                    {data.name}<br />
                    <p className='text-sm font-extralight font-serif'>{data.gender}</p>
                  </h1>
                  <h1 className='text-xl text-orange-400 font-semibold'>{data.relationship}</h1>
                  <h1 className='text-sm'>DOB: {data.dob}</h1>
                  <h1 className='text-sm'>Phone No: {data.phone}</h1>
                  <h1 className="text-sm">email: {data.email}</h1>

                  {isExpanded && (
                    <div className='mt-2 text-sm bg-purple-700 p-2 rounded-lg text-white'>
                      {data.notes || "No notes available"}
                    </div>
                  )}

                  <button
                    className='bg-orange-400 p-2 rounded-2xl text-sm mt-2 font-bold cursor-pointer'
                    onClick={() => toggleExpand(i)}
                  >
                    {isExpanded ? "View Less" : "View More"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className='col-span-4 text-center mt-10 text-xl'>No results found</h1>
        )}
      </div>
    </div>
  );
}
