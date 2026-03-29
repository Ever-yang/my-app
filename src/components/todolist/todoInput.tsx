import React, { useState, useRef } from 'react';
import styles from './styles/index.module.scss';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [value, setValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      // 空输入触发抖动动画
      setIsShaking(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    onAddTodo(trimmedValue);
    setValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.todoInputSection}>
      <input
        ref={inputRef}
        type="text"
        className={`${styles.todoInput} ${isShaking ? styles.shake : ''}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="输入新的 todo..."
        maxLength={200}
        aria-label="输入新的 todo"
      />
      <button
        className={styles.addButton}
        onClick={handleSubmit}
        disabled={!value.trim()}
        aria-label="添加 todo"
      >
        <span className={styles.addButtonContent}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ marginRight: '8px' }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          添加 Todo
        </span>
      </button>
      {value.length > 0 && (
        <div className={styles.charCount}>
          {value.length} / 200
        </div>
      )}
    </div>
  );
};

export default TodoInput;