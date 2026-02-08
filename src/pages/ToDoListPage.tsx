import { useState, useEffect } from "react"
import { Form } from "../components/Form/Form"
import { ToDoList } from "../components/ToDoList/ToDoList"
import { ToDo } from "../models/todo-item"
import { toast, ToastContainer } from "react-toastify"

const STORAGE_KEY = "todos"

export const ToDoListPage = () => {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    try {
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error("Failed to parse todos from localStorage")
      return []
    }
  })

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updatedTodos: ToDo[] = JSON.parse(e.newValue)
          // Избегаем зацикливания: не реагируем, если это свои же изменения
          if (JSON.stringify(updatedTodos) !== JSON.stringify(todos)) {
            setTodos(updatedTodos)
            toast.info("Задачи обновлены из другой вкладки", { autoClose: 2000 })
          }
        } catch (err) {
          console.error("Failed to parse storage update")
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [todos]) // Зависимость нужна, чтобы сравнить с текущим состоянием

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
      
      <Form createNewToDo={createNewToDo} />
      <ToDoList todos={todos} updateToDo={updateToDo} deleteToDo={deleteToDo} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  )
}
