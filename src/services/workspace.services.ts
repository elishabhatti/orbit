import { workspaceModel } from "@/src/models/workspace.model";

export class WorkspaceService {
  static async createWorkspace(userId: string, data: any) {
    const workspace = await workspaceModel.create({
      name: data.name,
      description: data.description,
      owner: userId,
      members: [
        {
          user: userId,
          role: "owner",
        },
      ],
    });

    return workspace;
  }

  static async getMyWorkspaces(userId: string) {
    return workspaceModel
      .find({ "members.user": userId })
      .populate("owner", "fullName email avatar");
  }

  static async getWorkspaceById(id: string) {
    return workspaceModel
      .findById(id)
      .populate("owner", "fullName email avatar")
      .populate("members.user", "fullName email avatar");
  }
}