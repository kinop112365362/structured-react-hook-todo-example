import React from 'react'
import { useRouteNode } from 'react-router5'
import TodoList from './ToDoList'
import LogicReuse from './LogicReuse'

function Main () {
  const { route } = useRouteNode('')
  const topRouteName = route.name.split('.')[0]
  if(topRouteName === 'todo'){
    return <TodoList></TodoList>
  }
  if(topRouteName === 'logicReuse'){
    return <LogicReuse></LogicReuse>
  }
}

export default Main
