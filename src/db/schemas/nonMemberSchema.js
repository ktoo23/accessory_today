import { Schema } from "mongoose";

export const NonMemberSchema = new Schema({
  email: { type: String, required: true },
  nonMemberPassword: { type: String, required: true },
  username: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});
