import { useEffect, useState } from "react"


function App() {
  const [allTodos, setAllTodo] = useState([])
  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" })
  // const [title, setTitle] = useState("")
  // const [desc, setDesc] = useState("")

  function handleAddTodo() {
    if (!singleTodo.title || !singleTodo.desc) {
      return (alert("Invalid ! No content detected. "))
    }
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

      <div className=" bg-gray-800 w-screen min-h-screen  text-center" >
        <h1 className="text-4xl pt-10">Todo APP</h1>
        <div className="mt-10">
          <input
            className="text-2xl bg-white px-[1.5rem] py-1 focus:outline-none rounded-md capitalize"
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
            className="text-2xl bg-white px-[1.5rem] py-1 focus:outline-none rounded-md capitalize"
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
            className=" text-2xl bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={handleAddTodo}
          >Add Todo</button>
        </div>

        <div className="w-[50%] mx-auto">
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
      </div>
    </>
  )
}

export default App
