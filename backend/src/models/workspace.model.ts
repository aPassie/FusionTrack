import mongoose, {Document} from 'mongoose'
import { generateInviteCode } from '../utils/uuid'

export interface WorkspaceDocument extends Document {
    name: string,
    description: string,
    owner: mongoose.Types.ObjectId,
    inviteCode: string,
    createdAt: string,
    updatedAt: string
}

const Workspace = new mongoose.Schema<WorkspaceDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    inviteCode: {
        type: String,
        required: true,
        unique: true,
        default: generateInviteCode(),
    }
},{timestamps: true})

Workspace.methods.resetInviteCode = function () {
    this.invitecode = generateInviteCode()
}

const WorkspaceModel = mongoose.model<WorkspaceDocument>("Workspace", Workspace);

export default WorkspaceModel;
