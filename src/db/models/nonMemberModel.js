import mongoose from "mongoose";
import { NonMemberSchema } from "../schemas/nonMemberSchema.js";

export const NonMember = mongoose.model("NonMember", NonMemberSchema);
