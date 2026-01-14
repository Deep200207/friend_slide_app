import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    requester:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recevier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted"],
        default:"pending"
    },
    createdAt:{type : Date, default :Date.now}
});
friendSchema.index(
    {recevier:1,requester:1},
    {unique:true}
)
const Friend = mongoose.model("Friend", friendSchema);
export default Friend;