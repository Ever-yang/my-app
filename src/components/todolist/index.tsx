import React from 'react';
import { useWatch } from '../../abstactStore';
import { todoStore } from '../../store/todoStore';
import { FilterType } from '../../types/todo';
import TodoHeader from './todoHeader';
import TodoInput from './todoInput';
import TodoFilters from './todoFilters';
import TodoList from './todoList';
import styles from './styles/index.module.scss';

const TodoApp: React.FC = () => {
  // 使用 useWatch 监听 store 变化
  useWatch(todoStore);

  const filteredTodos = todoStore.filteredTodos;
  const stats = todoStore.stats;
  const currentFilter = todoStore.filter;

  const handleAddTodo = (text: string) => {
    todoStore.addTodo(text);
  };

  const handleToggleTodo = (id: string) => {
    todoStore.toggleTodo(id);
  };

  const handleDeleteTodo = (id: string) => {
    todoStore.deleteTodo(id);
  };

  const handleEditTodo = (id: string, text: string) => {
    todoStore.editTodo(id, text);
  };

  const handleFilterChange = (filter: FilterType) => {
    todoStore.setFilter(filter);
  };

  const handleClearCompleted = () => {
    if (window.confirm('确定要清除所有已完成的 todo 吗？')) {
      todoStore.clearCompleted();
    }
  };

  return (
    <div className={styles.todoApp}>
      <div className={styles.todoContainer}>
        <TodoHeader stats={stats} />

        <TodoInput onAddTodo={handleAddTodo} />

        <TodoFilters
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
          counts={{
            all: stats.total,
            active: stats.active,
            completed: stats.completed
          }}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />

        {stats.total > 0 && (
          <div className={styles.todoFooter}>
            <span className={styles.todoCount}>
              剩余 {stats.active} 个待办任务
            </span>
            <button
              className={styles.clearButton}
              onClick={handleClearCompleted}
              disabled={stats.completed === 0}
            >
              清除已完成
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;