import express from "express"
import protect from "../middleware/protectRoute.js"

import { sendRequest, acceptRequest, getFriends ,getPendingRequests, getPendingRecevier} from "../userController/FrndLstRoute.js"
import {searchUsers} from "../userController/searchRoute.js";

const router=express.Router();

router.get("/pendingReceiver",protect,getPendingRecevier);
router.get("/pending",protect,getPendingRequests);
router.post("/request/:id",protect,sendRequest);
router.put("/accept/:id",protect,acceptRequest);
router.get("/get",protect,getFriends);
router.get("/search",protect,searchUsers);

export default router;  