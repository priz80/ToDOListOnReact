import { useState } from "react"
import { Form } from "../components/Form/Form"
import { Header } from "../components/Header/Header"
import { ToDoList } from "../components/ToDoList/ToDoList"
import { ToDo } from "../models/todo-item"
import { toast, ToastContainer } from "react-toastify"
/* import "react-toastify/dist/ReactToastify.css" */

export const ToDoListPage = () => {
  const [todos, setTodos] = useState<ToDo[]>([])

  const createNewToDo = (text: string) => {
    const newToDo: ToDo = {
      id: todos.length,
      text: text,
      isDone: false,
    }
    setTodos([...todos, newToDo])
    toast.success("Задача добавлена!")
  }

  const updateToDo = (toDoItem: ToDo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === toDoItem.id) {
        todo.isDone = !todo.isDone
      }
      return todo
    })
    setTodos(newTodos)
    const status = toDoItem.isDone ? "выполнена" : "отмечена как невыполненная"
    toast.info(`Задача "${toDoItem.text}" ${status}`)
  }

  const deleteToDo = (toDoItem: ToDo) => {
    const newTodos = todos.filter((todo) => todo.id !== toDoItem.id)
    setTodos(newTodos)
    toast.warn("Задача удалена")
  }

  return (
    <>
      <Header />
      <Form createNewToDo={createNewToDo} />
      <ToDoList todos={todos} updateToDo={updateToDo} deleteToDo={deleteToDo} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  )
}
