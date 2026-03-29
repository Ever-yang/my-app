import React, { useState } from 'react';
import './styles/index.scss'
import Button, { ButtonSize, ButtonType } from './components/button/button';
import Alert, { AlertType } from './components/alert/alert';
import { Menu } from './components/menu/menu';
import { MenuItem } from './components/menu/menuItem';
import { useWatch } from './abstactStore';
import { astore } from './store/astore';
import ControlledForm from './components/input/input';
import { Routes, Route, Link } from 'react-router-dom'
import { About } from './components/about/about';
import { Home } from './components/home/home';
import TodoApp from './components/todolist';

export default function App() {
  return (
    <div>
      {/* 设置路由链接 */}
      {/* className 接收一个函数，可以改变激活的类名 */}
      <Link className='list-group-item' to="/about/123">About</Link>
      <Link className='list-group-item' to="/home">Home</Link>
      <Link className='list-group-item' to="/todos">Todos</Link>

      {/* 注册路由 */}
      {/* 必须用 Routes 组件进行包裹*/}
      {/* Route 组件的 element 属性值为对应的组件*/}
      {/* caseSensitive 严格区分大小写*/}
      <Routes>
        <Route path="/about/:id" caseSensitive element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/todos" element={<TodoApp />}></Route>
      </Routes>
    </div>
  )
}
