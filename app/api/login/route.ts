// export interface req {}

import { NextRequest, NextResponse } from "@/node_modules/next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/lib/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");
    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // await User.create({ userName, email });
    return NextResponse.json({
      res: {
        data: { email: email, password: password },
        message: "Successfully logged in",
      },
    });
  } catch (error) {}
}

// export async function POST(req: NextRequest, res: any) {
//   try {
//     const { userName, email } = await req.json();

//     console.log("data:", userName, email);
//     await connectDB();
//     await UserModel.create({ userName, email });
//     const newUser = new UserModel(req.body);
//     await newUser.save();
//     res.send(newUser);

//     console.log(NextResponse.json());
//     return NextResponse.json({
//       res: {
//         data: { user: userName, email: email },
//         message: "Successfully logged in",
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     if (error instanceof mongoose.Error.ValidationError) {
//       let errorList = [];
//       for (let e in error.errors) {
//         errorList.push(error.errors[e].message);
//       }
//       console.log(errorList);
//       return NextResponse.json({ errors: { message: errorList } });

//       return NextResponse.json({ msg: errorList });
//     } else {
//       return NextResponse.json({ msg: ["Unable to send message."] });
//     }
//   }
//   return NextResponse.json({ errors: { message: "" } });
// }
