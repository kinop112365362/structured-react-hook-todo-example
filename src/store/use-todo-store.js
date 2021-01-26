/* eslint-disable no-alert */

import React from 'react'
import { getTodolist } from './service'
import createStore from 'structured-react-hook'
import { TodoItem } from '../component/ToDoItem'
import { InputCheckBox } from '../component/Styled'
import { Checkbox, Button, Typography, Space } from 'antd'
import {css} from '@emotion/css'


const pl24 = css` 
  padding-left: 24px;
`
export const storeName = 'toDoStore'
export const useTodoStore = createStore({
  name: storeName,
  initState: {
    // @@加载状态${value}
    loading: false,
    // @@todolist 数组
    todolist: [],
    // @@是否全部完成: ${value}
    completed: false,
    // @@todo 统计数据字段的颜色: ${value}
    textColor: '#9e9e9e',
    // @@一共完成了${value}项
    totalCount: 0,
    // @@有${value}项待保存
    editCount: 0,
    // @@总共有${value}项
    total: 0
  },
  ref: {
    valueCache: 0,
    todoItemCompleted: false
  },
  view: {
    // @@渲染 todo 列表
    renderUl (ul) {
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
                          this.controller.onTodolistCompletedCheck(
                            e.target.checked
                          )
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
  },
  service: {
    // @@ 切换第 ${2} 项的状态为 ${1}
    switchEditStatus (editStatus, id) {
      const todoItem = this.state.todolist.find(todo => todo.id === id)
      this.refs.todoItemCompleted.current = todoItem.completed
      if (editStatus === '编辑') {
        return ['保存', false]
      }
      if (editStatus === '保存') {
        return ['编辑', this.refs.todoItemCompleted.current]
      }
      throw new Error('未知的 editStatus', editStatus)
    },
    // @@ ${0} → ${1}
    putValueCacheByComplete (completed) {
      completed
        ? this.refs.valueCache.current++
        : this.refs.valueCache.current--
      if (this.refs.valueCache.current === 0) {
        return false
      }
      if (this.refs.valueCache.current === this.state.todolist.length) {
        return true
      }
      if (this.refs.valueCache.current === 5) {
        return true
      }
      if (this.refs.valueCache.current < 5) {
        return false
      }
    },
    // @@ 自动切换全部完成选项: ${1}
    putValueCacheByAllComplete (completed) {
      if (completed === true) {
        this.refs.valueCache.current = 5
      }
      if (completed === false) {
        this.refs.valueCache.current = 0
      }
    },
    // @@ 创建一个操作${1}字段的 todolist 快捷函数
    createTodolistPutByKey (key) {
      const { todolist } = this.state
      return {
        //
        put: value => {
          const result = todolist.map(todo => ({
            ...todo,
            [key]: value
          }))
          return result
        },
        putById: (id, value) => {
          todolist.forEach(todo => {
            if (todo.id === id) {
              todo[key] = value
            }
          })
          return todolist
        }
      }
    }
  },
  controller: {
    // @@ 点击新增一项待办
    onAddTodoButtonClick () {
      const { todolist } = this.state
      todolist.push({
        id: todolist.length + 1,
        content: '输入待办内容',
        editStatus: '保存'
      })
      this.rc.setTodolist(todolist)
      this.rc.setCompleted(false)
    },
    // @@ todolist 数组发生变更
    onTodolistChange () {
      let totalCount = 0
      let editCount = 0
      this.state.todolist.forEach(todo => {
        if (todo.editStatus === '保存') {
          editCount++
        }
        if (todo.completed) {
          totalCount++
        }
      })
      this.rc.setState({
        totalCount,
        editCount,
        total: this.state.todolist.length
      })
    },
    // @@ 第 ${2} 项的 todo 内容修改成 ${1}
    onTodoContentChange (value, id) {
      const { putById } = this.service.createTodolistPutByKey('content')
      const result = putById(id, value)
      this.rc.setTodolist(result)
    },
    // @@ 勾选了第 ${2} 项的 todo
    onCheckBoxChange (completed, id) {
      const todolistService = this.service.createTodolistPutByKey('completed')
      console.log(todolistService)
      const result = todolistService.putById(id, completed)
      this.rc.setTodolist(result)
      this.rc.setCompleted(this.service.putValueCacheByComplete(completed))
    },
    // @@ 点击了第 ${1} 项的 todo 的${2}按钮
    onEditButtonClick (id, editStatus) {
      const [nextEditStatus, completed] = this.service.switchEditStatus(
        editStatus,
        id
      )
      const putEditStatusById = this.service.createTodolistPutByKey(
        'editStatus'
      )
      const putCompletedById = this.service.createTodolistPutByKey('completed')
      this.rc.setTodolist(putEditStatusById.putById(id, nextEditStatus))
      this.rc.setTodolist(putCompletedById.putById(id, completed))
    },
    // @@ 当组件首次加载完成
    async onComponentDidMount () {
      const res = await getTodolist()
      this.rc.setTodolist(res)
      this.rc.setLoading(true)
    },
    // @@ 勾选全部完成: ${1}
    onTodolistCompletedCheck (completed) {
      const { put } = this.service.createTodolistPutByKey('completed')
      const todolist = put(completed)
      this.service.putValueCacheByAllComplete(completed)
      this.rc.setState(state => {
        return {
          todolist,
          completed,
          textColor: completed ? 'green' : '#9e9e9e'
        }
      })
    }
  }
})

export default React.createContext()
