import React from 'react';
import { Todo } from '../../types/todo';
import TodoItem from './todoItem';
import styles from './styles/index.module.scss';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit
}) => {
  if (todos.length === 0) {
    return (
      <div className={styles.todoList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            📝
          </div>
          <div className={styles.emptyText}>
            还没有 todo 任务
          </div>
          <div className={styles.emptySubtext}>
            添加一些任务开始高效工作吧！
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.todoList} role="list" id="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;