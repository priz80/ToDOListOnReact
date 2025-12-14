import { useState, useEffect } from "react"
import { Form } from "../components/Form/Form"
import { Header } from "../components/Header/Header"
import { ToDoList } from "../components/ToDoList/ToDoList"
import { ToDo } from "../models/todo-item"
import { toast, ToastContainer } from "react-toastify"

const STORAGE_KEY = "todos"

export const ToDoListPage = () => {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    // Чтение из localStorage при старте
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // Сохранение в localStorage при изменении todos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const createNewToDo = (text: string) => {
    const newToDo: ToDo = {
      id: Date.now(),
      text,
      isDone: false,
    }
    setTodos(prev => [...prev, newToDo])
    toast.success("Задача добавлена!")
  }

  const updateToDo = (toDoItem: ToDo) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === toDoItem.id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
    const status = toDoItem.isDone ? "возвращена в работу" : "выполнена"
    toast.info(`Задача "${toDoItem.text}" ${status}`)
  }

  const deleteToDo = (toDoItem: ToDo) => {
    setTodos(prev => prev.filter(todo => todo.id !== toDoItem.id))
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
