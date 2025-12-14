import { ToDoListItem } from "./ToDoListItem/ToDoListItem"
import "./ToDoList.scss"
import { ToDo } from "../../models/todo-item"

export const ToDoList = (props: {
  todos: ToDo[]
  updateToDo: (item: ToDo) => void
  deleteToDo: (item: ToDo) => void
}) => {
  const uncheckedList = props.todos
    .filter(item => !item.isDone)
    .map(item => (
      <ToDoListItem
        toDoItem={item}
        key={item.id} // ✅ уникальный ключ
        updateToDo={props.updateToDo}
        deleteToDo={props.deleteToDo}
      />
    ))

  const checkedList = props.todos
    .filter(item => item.isDone)
    .map(item => (
      <ToDoListItem
        toDoItem={item}
        key={item.id} // ✅ уникальный ключ
        updateToDo={props.updateToDo}
        deleteToDo={props.deleteToDo}
      />
    ))

  return (
    <div className="todo-container">
      <ul className="todo-list failed">{uncheckedList}</ul>
      <ul className="todo-list completed">{checkedList}</ul>
    </div>
  )
}
