import { Schema, model, Model, HydratedDocument } from "mongoose";
import { IUser } from "../interface/user";
import bcrypt from "bcryptjs";

interface UserModel extends Model<IUser, {}> {
  findByCredentials(email: string, password: string): Promise<HydratedDocument<IUser>>
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  avatar: { type: String },
  currency: { type: String },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    return null
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return null
  }

  return user
}

const User = model<IUser, UserModel>('User', userSchema)

export default User