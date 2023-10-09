import mongoose from "mongoose";
import { UserSchema } from "../schemas/userSchema.js";

export const User = mongoose.model("User", UserSchema);
