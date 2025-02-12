export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'inProgress' | 'done';
import {  Id  } from 'convex-react';

export interface Task {
  _id: Id<"tasks">;
  _creationTime: number;
  updatedAt?: number;
  status: string;
  userId: string;
  createdAt: number;
  title: string;
  completed: boolean;
  priority: Priority;
  description: string;
  categoryId: Id<"categories">;
}