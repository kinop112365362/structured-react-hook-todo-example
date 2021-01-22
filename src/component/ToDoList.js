import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import TodoStoreContext, { useTodoStore } from '../store/use-todo-store';

const ul = css`
  text-align: left;
  width: 400px;
  margin: auto;
  padding: 20px;
  list-style: none;
`;

function Todolist() {
  const todoStore = useTodoStore();
  const { todolist, completed } = todoStore.state;
  useEffect(() => {
    todoStore.controller.onComponentDidMount();
  }, []);
  useEffect(() => {
    todoStore.controller.onTodolistChange();
  }, [todolist]);
  useEffect(() => {
    todoStore.controller.onCompletedChange();
  }, [completed]);
  return (
    <TodoStoreContext.Provider value={todoStore}>
      {todoStore.view.renderUl(ul)}
    </TodoStoreContext.Provider>
  );
}

export default Todolist;
