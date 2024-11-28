import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '../store/useTaskStore';
import { Status, Category, Priority, Task } from '../types/task';

const columns: { id: Status; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

interface KanbanBoardProps {
  searchQuery: string;
  selectedCategory: Category | 'all';
  selectedPriority: Priority | 'all';
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  searchQuery,
  selectedCategory,
  selectedPriority,
}) => {
  const { tasks, moveTask, deleteTask, updateTask } = useTaskStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    moveTask(draggableId, destination.droppableId as Status);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 h-full">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[300px]">
            <h2 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg min-h-[500px]"
                >
                  {filteredTasks
                    .filter((task) => task.status === column.id)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onDelete={deleteTask}
                              onEdit={(updatedTask) =>
                                updateTask(task.id, updatedTask)
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};