import { Schema, model, models } from "mongoose";

const fileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    files: [{ type: String }],
  },
  { timestamps: true }
);

//

const UserFiles = models.files || model("files", fileSchema);

export default UserFiles;
