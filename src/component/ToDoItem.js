import React, { useContext, useEffect } from 'react'
import TodoStoreContext from '../store/use-todo-store'
import { InputCheckBox, inputText } from './Styled'
import { Button, Row, Col, Space, Checkbox, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'

const liStyle = css`
  margin: 4px 0;
  .ant-input {
    width: 245px;
  }
`

export function TodoItem ({ todo }) {
  const { controller } = useContext(TodoStoreContext)
  return (
    <li className={liStyle} key={todo.id}>
      <Space>
        <Checkbox
          type='checkBox'
          onChange={e => {
            controller.onCheckBoxChange(e.target.checked, todo.id)
          }}
          defaultChecked={todo.completed}
          checked={todo.completed}
        />
        <Input
          autoFocus
          type='text'
          onChange={e => {
            controller.onTodoContentChange(e.target.value, todo.id)
          }}
          disabled={todo.editStatus === '编辑'}
          value={todo.content}
        />
        <Button
          icon={<EditOutlined />}
          onClick={e => {
            controller.onEditButtonClick(todo.id, todo.editStatus)
          }}
        >
          {todo.editStatus}
        </Button>
      </Space>
    </li>
  )
}
