export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';
export type Category = 'work' | 'personal' | 'shopping' | 'health';

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  dueDate: Date | null;
  assignedTo?: User;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}