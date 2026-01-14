import User from "../Models/User.js";
function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export const searchUsers = async (req, res) => {
    try {
        const search = req.query.search;
        if (!search || !search.trim()) {
            return res.status(200).json([]);
        }
        // const searchSec=search.trim()
        console.log(search)
        const safeSearch = escapeRegex(search)
        console.log(safeSearch)
        const users = await User.find({
            $or: [
                { name: { $regex: safeSearch, $options: "i" } },
                { email: { $regex: safeSearch, $options: "i" } }
            ],
            _id: { $ne: req.user._id }
        }).select("-password");
        // console.log(req)
        // const name= req.query.search
        // // console.log(name)
        //     ? {
        //         $or: [
        //             { name: { $regex: req.query.search, $options: "i" } },
        //             { email: { $regex: req.query.search, $options: "i" } },
        //         ],
        //     }
        // : {};
        // console.log(name)
        // const users = await User.find(name).select("-password")//exclude self by $ne -> not equal
        console.log(users)
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
}
// export default searchUsers;