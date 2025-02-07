export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  userId?: string;
  category: string;
}