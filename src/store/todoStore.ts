import { AbstractStore } from '../abstactStore';
import { Todo, FilterType, TodoStats } from '../types/todo';

export class TodoStore extends AbstractStore {
  todos: Todo[] = [];
  filter: FilterType = 'all';

  constructor() {
    super();
    this.loadFromStorage();
  }

  // CRUD 操作
  addTodo(text: string): void {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: this.generateId(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.todos.unshift(newTodo);
    this.saveToStorage();
    this.notify();
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToStorage();
    this.notify();
  }

  toggleTodo(id: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = Date.now();
      this.saveToStorage();
      this.notify();
    }
  }

  editTodo(id: string, text: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo && text.trim()) {
      todo.text = text.trim();
      todo.updatedAt = Date.now();
      this.saveToStorage();
      this.notify();
    }
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToStorage();
    this.notify();
  }

  setFilter(filter: FilterType): void {
    this.filter = filter;
    this.notify();
  }

  // 计算属性
  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  get stats(): TodoStats {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
  }

  // 辅助方法
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('todoFilter', this.filter);
  }

  private loadFromStorage(): void {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }

      const storedFilter = localStorage.getItem('todoFilter');
      if (storedFilter && this.isValidFilter(storedFilter)) {
        this.filter = storedFilter as FilterType;
      }
    } catch (error) {
      console.error('Failed to load todos from storage:', error);
      this.todos = [];
    }
  }

  private isValidFilter(filter: string): filter is FilterType {
    return ['all', 'active', 'completed'].includes(filter);
  }
}

export const todoStore = new TodoStore();