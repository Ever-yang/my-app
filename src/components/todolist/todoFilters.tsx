import React from 'react';
import { FilterType } from '../../types/todo';
import styles from './styles/index.module.scss';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  counts
}) => {
  const filters: Array<{ type: FilterType; label: string; count: number }> = [
    { type: 'all', label: '全部', count: counts.all },
    { type: 'active', label: '进行中', count: counts.active },
    { type: 'completed', label: '已完成', count: counts.completed }
  ];

  return (
    <div className={styles.todoFilters} role="tablist">
      {filters.map((filter) => (
        <button
          key={filter.type}
          className={`${styles.filterButton} ${currentFilter === filter.type ? styles.active : ''}`}
          onClick={() => onFilterChange(filter.type)}
          role="tab"
          aria-selected={currentFilter === filter.type}
          aria-controls="todo-list"
        >
          <span className={styles.filterLabel}>{filter.label}</span>
          <span className={styles.filterCount}>({filter.count})</span>
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;