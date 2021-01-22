import React, { useContext, useEffect } from 'react';
import TodoStoreContext from '../store/use-todo-store';
import { InputCheckBox, inputText, Button } from './Styled';

export function TodoItem({ todo }) {
  const { controller } = useContext(TodoStoreContext);
  return <li key={todo.id}>
    <InputCheckBox type="checkBox"
      onChange={e => {
        controller.onCheckBoxChange(e.target.checked, todo.id);
      }}
      defaultChecked={todo.completed}
      checked={todo.completed}/>
    <input autoFocus type="text"
      onChange={e => {
        controller.onTodoContentChange(e.target.value, todo.id);
      }}
      className={inputText}
      disabled={todo.editStatus === '编辑'} value={todo.content}/>
    <Button onClick={e => {
      controller.onEditButtonClick(todo.id, todo.editStatus);
    }}>{todo.editStatus}
    </Button>
  </li>;
}
