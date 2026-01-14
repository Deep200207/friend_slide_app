import Friend from "../Models/Friends.js";


export const getPendingRecevier=async(req,res)=>{
  try{
    const request=await Friend.find({
      recevier:req.user._id,
      status:"pending",
    })
    .populate("requester","name email pic")
    console.log(request);
    res.json(request);
  }catch(err){
    res.status(500).json({message:err.message});
  }
}

export const getPendingRequests = async (req, res) => {
  try {
    // console.log(req.user._id)
    const requests = await Friend.find({
      requester: req.user._id,
      status: "pending",
    })
      .populate("recevier", "name email pic");
      // console.log({data:requests[0].recevier,send:"send"})
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendRequest = async (req, res) => {
  const receiverId = req.params.id;
  if (receiverId === req.user._id.toString())
    return res.status(400).json({ message: "Cannot friend yourself" });

  const request = await Friend.create({
    requester: req.user._id,
    recevier: receiverId
  });
  return res.json({ message: "Friend request sent", request });
};

export const acceptRequest = async (req, res) => {
  const request = await Friend.findById(req.params.id);
  if (!request)
    return res.status(404).json({ message: "Request not found" });

  if (request.recevier.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  request.status = "accepted";
  await request.save();

  res.json({ message: "Friend request accepted" });
};

export const getFriends = async (req, res) => {
  try {
    const friendships = await Friend.find({
      status: "accepted",
      $or: [
        { requester: req.user._id },
        { recevier: req.user._id }
      ]
    }).populate("requester recevier", "name email pic");

    // this function is used to filter the friend w.r.t login user
    //as abi=ove er are poppulate both requester and recevier so need to filter cause 
    // we need one of them in different request case //
    // so we use filter funtion for it 
    const friends = friendships.map(f =>
      f.requester._id.toString() === req.user._id.toString()
        ? f.recevier
        : f.requester
    );
    console.log(friendships)
    return res.json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("err Occur", err);
  }
};
