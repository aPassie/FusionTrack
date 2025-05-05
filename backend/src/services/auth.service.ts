import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/roles-permission.model";
import { Roles } from "../enums/role.enum";
import { BadRequestException, NotFoundException } from "../utils/appError";
import MemberModel from "../models/member.model";
import { ProviderEnum } from "../enums/account-provider.enum";

export const loginOrCreateAccountService = async (data: {
    provider: string,
    displayName: string,
    providerId: string,
    picture?: string,
    email?: string
}) => {
    const { providerId, provider, displayName, email, picture } = data;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        console.log("Session Started ...");

        let user = await UserModel.findOne({ email }).session(session);
        if(!user){
            user = new UserModel({
                email,
                name: displayName,
                profilePicture: picture || null
            })
            await user.save({session})

        // Creating account
            const account = new AccountModel({
                userId: user._id,
                provider: provider,
                providerId: providerId
            })
            await account.save({session})

        // Creating workspace
            const workspace = new WorkspaceModel({
                name: `Mr. ${user.name}'s Workspace`,
                description: `Workspace created for ${user.name}`,
                owner: user._id,
            })
            await workspace.save({ session });

            const ownerRole = await RoleModel.findOne({
                name: Roles.OWNER
            }).session(session);

            if(!ownerRole) throw new NotFoundException("Owner role not found");

            const member = new MemberModel({
                userId: user._id,
                workspaceId: workspace._id,
                role: ownerRole._id,
                joinedAt: new Date()
            })
            await member.save({session});

            user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
            await user.save({ session });
        }
        await session.commitTransaction();
        session.endSession();
        console.log("Session Ended.")

        return {user}
    } catch (error){
        await session.abortTransaction()
        session.endSession();
        throw error;
    } finally {
        session.endSession();
    }
}

export const registerUserService = async( body: {
    email: string;
    name: string;
    password: string
}) => {
    const { email, name, password } = body
    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const existingUser = await UserModel.findOne({ email }).session(session)
        if(existingUser){
            throw new BadRequestException("Email already exists")
        }

        const user = new UserModel({
            email,
            name,
            password
        })
        await user.save({ session })

        const account = new AccountModel({
            userId: user._id,
            provider: ProviderEnum.EMAIL,
            providerId: email
        })
        await account.save({ session })

        const workspace = new WorkspaceModel({
            name: `${user.name}'s Workspace`,
            description: `Workspace created for ${user.name}`,
            owner: user._id
        })
        await workspace.save({session})

        const ownerRole = await RoleModel.findOne({
            name: Roles.OWNER
        }).session(session)

        if(!ownerRole){
            throw new NotFoundException("Owner Role not found!")
        }

        const member = new MemberModel({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date()
        })
        await member.save({session})

        user.currentWorkspace = workspace._id as mongoose.Types.ObjectId
        await user.save({session})

        await session.commitTransaction();
        session.endSession();
        console.log("Session ended...")

        return {
            userId: user._id,
            workspaceId: workspace._id
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;
    }
}