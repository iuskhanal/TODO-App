import { useEffect, useState } from "react"


function App() {
  const [allTodos, setAllTodo] = useState([])
  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" })
  // const [title, setTitle] = useState("")
  // const [desc, setDesc] = useState("")

  function handleAddTodo() {
    setAllTodo(prevValue => [...prevValue, singleTodo])
    // setAllTodo([...allTodos,singleTodo])
    saveTodoLocalStore([...allTodos, singleTodo])
  }

  function DeleteTodo(i) {
    let newArr = [...allTodos]
    newArr.splice(i, 1);
    saveTodoLocalStore(newArr)
    setAllTodo(newArr)
    
  }

  function saveTodoLocalStore(todo) {
    localStorage.setItem("todos", JSON.stringify(todo))
  }

  function getTodoFromLocalStore() {
    let data = JSON.parse(localStorage.getItem("todos")) || []
    setAllTodo(data)
  }

  useEffect(() => {
    getTodoFromLocalStore()
  }, [])

  return (
    <>

      <div>
        <br />
        <input
          type="text"
          placeholder="title"
          onChange={
            (e) => setSingleTodo((prevValue) =>
            (
              {
                ...prevValue, title: e.target.value

              }
            ))
          }
          onKeyDown={
            (e) => {
              if (e.key == 'enter') {
                handleAddTodo()
              }
            }
          }
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="description"
          onChange={
            (e) => setSingleTodo((prevValue) => (
              {
                ...prevValue, desc: e.target.value
              }
            ))
          }
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                handleAddTodo()
              }
            }
          }
        />
        <br />
        <br />
        <button
          onClick={handleAddTodo}
        >Add Todo</button>
      </div>

      <div>
        {
          allTodos.map((data, i) => (
            <div key={i}>
              <p>{i + 1}</p>
              <h1>{data.title}</h1>
              <h1>{data.desc}</h1>
              <button
                onClick={
                  () => DeleteTodo(i)
                }
              >Delete</button>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default App
