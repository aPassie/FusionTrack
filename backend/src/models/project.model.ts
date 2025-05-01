import mongoose, {Document} from 'mongoose'

export interface ProjectDocument extends Document {
    name: string,
    description: string | null,
    emoji: string,
    workspace: mongoose.Types.ObjectId,
    createdBy: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const Project = new mongoose.Schema<ProjectDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false
    },
    emoji: {
        type: String,
        required: false,
        trim: true,
        default: "📊"
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    
},{timestamps:true})

const ProjectModel = mongoose.model<ProjectDocument>("Project", Project);
export default ProjectModel;