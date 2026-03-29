import React from 'react';
import { TodoStats } from '../../types/todo';
import styles from './styles/index.module.scss';

interface TodoHeaderProps {
  stats: TodoStats;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ stats }) => {
  return (
    <div className={styles.todoHeader}>
      <h1>✨ Todo List ✨</h1>

      {/* 进度条 */}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${stats.completionRate}%`
          } as React.CSSProperties}
          role="progressbar"
          aria-valuenow={stats.completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* 统计卡片 */}
      <div className={styles.todoStats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>总数</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#52c41a' }}>
            {stats.completed}
          </span>
          <span className={styles.statLabel}>已完成</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#ff7875' }}>
            {stats.active}
          </span>
          <span className={styles.statLabel}>待办</span>
        </div>
      </div>
    </div>
  );
};

export default TodoHeader;