import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const emailTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

emailTokenSchema.pre("save", function (next) {
  if (this.isModified("token")) {
    this.token = bcrypt.hashSync(this.token, 10);
  }
  next();
});

export default mongoose.model("emailVerificationToken", emailTokenSchema);
