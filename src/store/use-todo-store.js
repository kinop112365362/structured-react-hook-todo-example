/* eslint-disable no-alert */

import React from "react";
import { getTodolist } from "./service";
import createStore from "structured-react-hook";
import { TodoItem } from "../component/ToDoItem";
import { InputCheckBox } from "../component/Styled";

export const storeName = "toDoStore";
export const useTodoStore = createStore({
  name: storeName,
  initState: {
    loading: false,
    todolist: [],
    completed: false,
    textColor: "red",
    totalCount: 0,
    editCount: 0,
    total: 0
  },
  ref: {
    valueCache: 0,
    todoItemCompleted: false
  },
  view: {
    renderUl(ul) {
      if (this.state.loading) {
        return (
          <ul className={ul}>
            {this.state.todolist.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            <li>
              <button onClick={this.controller.onAddTodoButtonClick}>
                新增一项待办
              </button>
            </li>
            <li style={{ color: this.state.textColor }}>
              <InputCheckBox
                type="checkBox"
                checked={this.state.completed}
                onChange={(e) => {
                  this.controller.onTodolistCompletedCheck(e.target.checked);
                }}
              />
              全部完成/取消
              <span>
                合计完成 {this.state.totalCount} / {this.state.total} 项{" "}
              </span>
              <span>你有 {this.state.editCount} 项待保存</span>
            </li>
          </ul>
        );
      }
    }
  },
  service: {
    switchEditStatus(editStatus, id) {
      const todoItem = this.state.todolist.find((todo) => todo.id === id);
      this.refs.todoItemCompleted.current = todoItem.completed;
      if (editStatus === "编辑") {
        return ["保存", false];
      }
      if (editStatus === "保存") {
        return ["编辑", this.refs.todoItemCompleted.current];
      }
      throw new Error("未知的 editStatus", editStatus);
    },
    putValueCacheByComplete(completed) {
      completed
        ? this.refs.valueCache.current++
        : this.refs.valueCache.current--;
      if (this.refs.valueCache.current === 0) {
        return false;
      }
      if (this.refs.valueCache.current === this.state.todolist.length) {
        return true;
      }
      if (this.refs.valueCache.current === 5) {
        return true;
      }
      if (this.refs.valueCache.current < 5) {
        return false;
      }
    },
    putValueCacheByAllComplete(completed) {
      if (completed === true) {
        this.refs.valueCache.current = 5;
      }
      if (completed === false) {
        this.refs.valueCache.current = 0;
      }
    },
    createTodolistPutByKey(key) {
      const { todolist } = this.state;
      return {
        put: (value) => {
          const result = todolist.map((todo) => ({
            ...todo,
            [key]: value
          }));
          return result;
        },
        putById: (id, value) => {
          todolist.forEach((todo) => {
            if (todo.id === id) {
              todo[key] = value;
            }
          });
          return todolist;
        }
      };
    }
  },
  controller: {
    onAddTodoButtonClick() {
      const { todolist } = this.state;
      todolist.push({
        id: todolist.length + 1,
        content: "清输入待办内容",
        editStatus: "保存"
      });
      this.rc.setTodolist(todolist);
      this.rc.setCompleted(false);
    },
    onCompletedChange() {
      if (this.state.completed) {
        this.rc.setTextColor("green");
      } else {
        this.rc.setTextColor("red");
      }
    },
    onTodolistChange() {
      let totalCount = 0;
      let editCount = 0;
      this.state.todolist.forEach((todo) => {
        if (todo.editStatus === "保存") {
          editCount++;
        }
        if (todo.completed) {
          totalCount++;
        }
      });
      this.rc.setState({
        totalCount,
        editCount,
        total: this.state.todolist.length
      });
    },
    onTodoContentChange(value, id) {
      const { putById } = this.service.createTodolistPutByKey("content");
      const result = putById(id, value);
      this.rc.setTodolist(result);
    },
    onCheckBoxChange(completed, id) {
      const todolistService = this.service.createTodolistPutByKey("completed");
      console.log(todolistService);
      const result = todolistService.putById(id, completed);
      this.rc.setTodolist(result);
      this.rc.setCompleted(this.service.putValueCacheByComplete(completed));
    },
    onEditButtonClick(id, editStatus) {
      const [nextEditStatus, completed] = this.service.switchEditStatus(
        editStatus,
        id
      );
      const putEditStatusById = this.service.createTodolistPutByKey(
        "editStatus"
      );
      const putCompletedById = this.service.createTodolistPutByKey("completed");
      this.rc.setTodolist(putEditStatusById.putById(id, nextEditStatus));
      this.rc.setTodolist(putCompletedById.putById(id, completed));
    },
    async onComponentDidMount() {
      const res = await getTodolist();
      this.rc.setTodolist(res);
      this.rc.setLoading(true);
    },
    onTodolistCompletedCheck(completed) {
      const { put } = this.service.createTodolistPutByKey("completed");
      const todolist = put(completed);
      this.service.putValueCacheByAllComplete(completed);
      this.rc.setState({
        todolist,
        completed
      });
    }
  }
});

export default React.createContext();
