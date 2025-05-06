import mongoose, {Document} from 'mongoose'
import { comparePass, hashVal } from '../utils/bcrypt';

export interface UserDocument extends Document {
    name: string,
    email: string,
    password?: string,
    profilePicture: string | null,
    isActive: boolean,
    lastLogin: Date | null,
    createdAt: Date,
    updatedAt: Date,
    currentWorkspace: mongoose.Types.ObjectId | null,
    comparePassword (value: string): Promise<boolean>;
    omitPassword(): Omit<UserDocument, "password">
}

const User = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    currentWorkspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }

},{timestamps:true})

User.pre("save", async function (next) {
    if(this.isModified("password")){
        if(this.password){
            this.password = await hashVal(this.password)
        }
    }
    next();
});

User.methods.omitPassword = function(): Omit<UserDocument, "password">{
    const userObj = this.toObject();
    delete userObj.password;
    return userObj;
}

User.methods.comparePassword = async function(value: string) {
     return comparePass(value, this.password)
} 

const UserModel = mongoose.model<UserDocument>("User", User)

export default UserModel;
