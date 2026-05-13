export interface User {
  _id: string;
  fullName: string;
  email: string;
}

export interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: string;
}

export interface Project {
  _id: string;
  name: string;
  key: string; // Like "ORB", "WEB"
  workspaceId: string;
}