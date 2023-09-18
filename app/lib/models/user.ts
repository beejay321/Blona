import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [2, "username must be more than 2 characters"],
      maxLength: [20, "username must be less than 25 characters"],
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

//

const User = models.users || model("users", userSchema);

export default User;
