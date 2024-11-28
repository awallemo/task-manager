import React from 'react';
import { format } from 'date-fns';
import { Calendar, Flag, Trash2, UserCircle } from 'lucide-react';
import { Task, User } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
        <button
          onClick={() => onDelete(task._id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{task.description}</p>
      
      <div className="flex items-center gap-3 text-sm">
        <span className={`px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          <Flag size={14} className="inline mr-1" />
          {task.priority}
        </span>
        
        {task.dueDate && (
          <span className="text-gray-500 dark:text-gray-400">
            <Calendar size={14} className="inline mr-1" />
            {format(new Date(task.dueDate), 'MMM d')}
          </span>
        )}
      </div>

      {task.assignedTo && (
        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <UserCircle size={14} className="mr-1" />
          <span>Assigned to {task.assignedTo.name}</span>
        </div>
      )}
    </div>
  );
};