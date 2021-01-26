import React from 'react'
import { TodoItem } from '../../component/ToDoItem'
import { Checkbox, Button, Typography, Space } from 'antd'
import { css } from '@emotion/css'

const pl24 = css`
  padding-left: 24px;
`
export function renderUl (ul) {
  if (this.state.loading) {
    return (
      <>
        <ul className={ul}>
          {this.state.todolist.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          <li>
            <Button
              type='primary'
              block
              onClick={this.controller.onAddTodoButtonClick}
            >
              新增一项待办
            </Button>
          </li>
          <li>
            <li style={{ color: this.state.textColor }}>
              <Space>
                <Space>
                  <Checkbox
                    type='checkBox'
                    checked={this.state.completed}
                    onChange={e => {
                      this.controller.onTodolistCompletedCheck(e.target.checked)
                    }}
                  />
                  <Typography.Text strong> 全部完成/取消</Typography.Text>
                </Space>
                <Space>
                  <div className={pl24}>
                    合计完成 {this.state.totalCount} / {this.state.total} 项{' '}
                  </div>
                  <div>你有 {this.state.editCount} 项待保存 </div>
                </Space>
              </Space>
            </li>
          </li>
        </ul>
      </>
    )
  }
}
