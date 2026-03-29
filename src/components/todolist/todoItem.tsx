import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../../types/todo';
import styles from './styles/todoItem.module.scss';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  // 编辑模式自动聚焦
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  // 应用动画延迟
  const animationDelay = `${index * 50}ms`;

  const handleEditStart = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 350); // 等待删除动画完成
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ''} ${isDeleting ? styles.deleting : ''} ${isEditing ? styles.editing : ''}`}
      style={{ animationDelay }}
      role="listitem"
    >
      {/* 自定义复选框 */}
      <label className={styles.todoCheckbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`标记 ${todo.text} 为${todo.completed ? '未完成' : '已完成'}`}
        />
        <span className={styles.checkbox}>
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </label>

      {/* Todo 内容 */}
      <div className={styles.todoContent}>
        {!isEditing ? (
          <>
            <div
              className={styles.todoText}
              onDoubleClick={handleEditStart}
              title="双击编辑"
            >
              {todo.text}
            </div>
            <div className={styles.todoTimestamp}>
              {formatTimestamp(todo.updatedAt)}
            </div>
          </>
        ) : (
          <>
            <input
              ref={editInputRef}
              type="text"
              className={styles.editInput}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="编辑 todo..."
              maxLength={200}
            />
            <div className={styles.charCount}>
              {editText.length} / 200
            </div>
          </>
        )}
      </div>

      {/* 操作按钮 */}
      <div className={styles.todoActions}>
        {!isEditing ? (
          <>
            <button
              className={`${styles.actionButton} ${styles.editButton}`}
              onClick={handleEditStart}
              title="编辑"
              aria-label="编辑 todo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={handleDelete}
              title="删除"
              aria-label="删除 todo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.actionButton} ${styles.saveButton}`}
              onClick={handleEditSave}
              title="保存"
              aria-label="保存编辑"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <button
              className={`${styles.actionButton} ${styles.cancelButton}`}
              onClick={handleEditCancel}
              title="取消"
              aria-label="取消编辑"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;