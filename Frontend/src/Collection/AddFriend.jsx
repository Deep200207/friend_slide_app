import React, { useEffect, useState } from 'react'
import { getFriends, searchFrnds } from '../features/frndSlice';
import { useDispatch, useSelector } from 'react-redux';
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export default function AddFriend() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [pendingList, setPendingList] = useState([]);
    const [recevierList, setRecevierList] = useState([]);
    const { frnds, frndsList } = useSelector((state) => state.friend)
    const count = 0;


    const acceptRequest=async(id)=>{
        try{
            const token=localStorage.getItem("slide_token");
            const res= await fetch(`${BASE_URL}/api/friends/accept/${encodeURIComponent(id)}`,{
                method:"PUT",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data= await res.json();
            // console.log(data);
        }catch(err){
            console.log("error",err);
        }
    }

    const pendingReceiver = async () => {
        try {
            const token = localStorage.getItem("slide_token");
            const res = await fetch(`${BASE_URL}/api/friends/pendingReceiver`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            // console.log(data)
            setRecevierList(data);
            // console.log(recevierList[0])
        } catch (err) {
            console.log("error:", err)
        }
    }
    useEffect(() => {
        pendingReceiver();
    }, [])
    const pendingRequest = async () => {
        try {
            const token = localStorage.getItem("slide_token");
            const res = await fetch(`${BASE_URL}/api/friends/pending`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            // console.log(data[0]?.recevier?.name);
            setPendingList(data);
            // console.log(pendingList)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        pendingRequest();
    }, []);
    const addFriend = async (id) => {
        try {
            const token = localStorage.getItem("slide_token")
            const res = await fetch(`${BASE_URL}/api/friends/request/${encodeURIComponent(id)}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            console.log(data);
            count++;

        } catch (err) {
            console.log("error", err)
        }
    }
    useEffect(() => {
        dispatch(getFriends());
        // console.log(frndsList);
    }, [],[acceptRequest])
    useEffect(() => {
        if (!searchTerm.trim()) return;
        const timer = setTimeout(() => {
            dispatch(searchFrnds(searchTerm));
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm])

    return (
        <div className='flex'>
            <div className='md:w-[70%] w-[75%]'>
                <div className='mt-20 flex justify-center items-center w-full '>
                    <div className='w-fit p-5 rounded-lg flex flex-col justify-center items-center'>
                        <h1 className='font-semibold text-xl mt-5'>Search And Make Friends</h1>
                        <input type="text" placeholder='Search By UserName' className='bg-violet-600 p-2
                    rounded-lg mt-5 w-50 md:w-100 lg:w-150 outline-0 ' onChange={(e) => setSearchTerm(e.target?.value)} />
                    </div>
                </div>
                <div className='mt-10'>
                    {frnds?.length > 0 && (
                        frnds?.map((item, index) => {
                            return (
                                <div className='flex items-center justify-center'>
                                    <div key={index} className='bg-violet-200 rounded  md:w-[60%] text-slate-900 p-1 md:p-2 flex  m-2 '>
                                        <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-cover bg-center' style={{ backgroundImage: `url(${item.pic})` }}>
                                        </div>
                                        <h1 className='font-semibold m-2 md:m-3 ml-5 '>{item?.email}</h1>
                                        <button className='text-sm md:font-normal ml-auto bg-violet-600 text-white p-1 md:p-2 rounded-lg '
                                            onClick={() => addFriend(item._id)}>Send Request</button>
                                        {/* ml-auto push button right take all left space if parent is flex */}
                                    </div>
                                </div>
                            )
                        })
                    )
                    }
                </div>

            </div>
            <div className='w-[25%] md:w-[30%] mt-20'>
                <div className='flex justify-center items-center'>
                    <div className=''>
                        {pendingList.length > 0 && <h1 className=' mt-1 lg:mt-2 p-1 font-semibold text-center'>Pending Sent Request</h1>}
                        {
                            pendingList.length > 0 && (
                                pendingList.map((item) => {
                                    return (
                                        <div key={item._id} className='flex bg-slate-200 m-2 p-1 rounded-xl text-slate-900 '>
                                            <div className='w-10 h-10 rounded-full  bg-cover bg-center m-1' style={{ backgroundImage: `url(${item?.recevier?.pic})` }
                                            }></div>
                                            <h1 className='m-2 font-semibold text-slate-800  p-1'>{item?.recevier?.name}</h1>
                                            <button className='ml-auto p-1 m-1 bg-amber-500 text-white font-semibold rounded'>Pending</button>
                                        </div>
                                    )
                                })
                            )
                        }

                        {/* <button className='bg-yellow-500 font-bold p-2 h-10 rounded-2xl lg:ml-2' onClick={() => pendingRequest()}>Pending</button> */}
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div>
                        {recevierList.length > 0 && <h1 className='text-center mt-2 font-semibold p-2'>Pending Accept Request</h1>}
                        {recevierList.length > 0 && (
                            recevierList.map((item, index) => {
                                return (
                                    <div key={item._id} className='flex bg-slate-200 m-2 p-1 rounded-xl text-slate-900 '>
                                        <div className='w-10 h-10 rounded-full bg-cover bg-center '
                                            style={{ backgroundImage: `url(${item?.requester?.pic})` }}></div>
                                        <h1 className='m-1 p-1 font-semibold'>{item?.requester?.name}</h1>
                                        <button className='ml-auto p-1 m-1 bg-purple-500 text-white font-semibold rounded' onClick={()=>acceptRequest(item._id)}>Accept</button>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
                <div className='justify-center flex items-center mt-5'>
                    <div>
                        <h1 className='text-xl m-2 font-bold'>Your Friends</h1>
                    </div>
                </div>
                <div>
                    {frndsList?.length > 0 ?
                        (frndsList?.map((item, index) => {
                            return (
                                <div key={item._id} className='flex bg-slate-200 m-2 p-1 rounded-xl text-slate-900 '>
                                    <div className='w-10 h-10 rounded-full bg-amber-500 bg-cover bg-center'
                                     style={{backgroundImage:`url(${item.pic})`}}></div>
                                    <h1 className='m-2 font-semibold'>{item.name}</h1>
                                    <button className='ml-auto p-1 m-1 bg-violet-500 text-white font-semibold rounded'>Message</button>
                                </div>
                            )
                        })
                        ) : <h1 className='text-center m-2'>No Friends Add Yet</h1>}
                </div>
            </div>
        </div>
    )
}
