
import { useState } from 'react';

// 受控表单示例：用户名输入 + 实时校验
const ControlledForm = () => {
    // 用 state 管理表单值
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    // 输入变化时更新 state（核心：onChange 绑定）
    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setUsername(value);

        // 实时校验（受控组件的优势：可实时处理）
        if (value.length < 3) {
            setError('用户名至少3个字符');
        } else {
            setError('');
        }
    };

    // 提交时直接用 state 的值（无需操作 DOM）
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('提交的用户名：', username); // 直接用 state，无需读 DOM
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                // 核心：value 绑定 state
                value={username}
                // 核心：onChange 触发 state 更新
                onChange={handleInputChange}
                placeholder="请输入用户名"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={!!error}>提交</button>
        </form>
    );
};

export default ControlledForm;