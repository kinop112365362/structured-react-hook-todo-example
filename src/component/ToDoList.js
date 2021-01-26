import React, { useEffect } from 'react'
import { css } from '@emotion/css'
import TodoStoreContext, { useTodoStore } from '../store/use-todo-store'
import { useRouteNode } from 'react-router5'

const ul = css`
  text-align: left;
  width: 400px;
  margin: auto;
  padding: 20px;
  list-style: none;
`

function Todolist () {
  const { route } = useRouteNode('todo')
  const todoStore = useTodoStore()
  const { todolist, completed } = todoStore.state
  useEffect(() => {
    todoStore.controller.onComponentDidMount()
  }, [])
  useEffect(() => {
    todoStore.controller.onTodolistChange()
  }, [todolist])
  return (
    <TodoStoreContext.Provider value={todoStore}>
      {todoStore.view.renderUl(ul)}
    </TodoStoreContext.Provider>
  )
}

export default Todolist
