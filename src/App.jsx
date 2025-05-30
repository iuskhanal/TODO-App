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
    setSingleTodo({ title: "", desc: "" })
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

  function deleteAllTodo() {
    setAllTodo([])
    saveTodoLocalStore([])

  }

  return (
    <>

      <div className=" bg-gray-800 max-w-screen min-h-screen  text-center overflow-hidden" >
        <h1 className="text-4xl pt-10 text-cyan-400 font-bold ">Todo App</h1>
        <div className="mt-10">

          {/* titile */}

          <input
            className="text-2xl bg-white px-[1.5rem] py-1 focus:outline-none rounded-md capitalize"
            type="text"
            placeholder="title"
            value={singleTodo.title}
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

          {/* Description */}

          <input
            className="text-2xl bg-white px-[1.5rem] py-1 focus:outline-none rounded-md capitalize"
            type="text"
            placeholder="description"
            value={singleTodo.desc}
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

        <div className="w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%]  mx-auto mt-10 ">
          {
            allTodos.map((data, i) => (
              <div
                className=" bg-slate-500/45  m-4 flex items-center justify-around rounded-lg "
                key={i}>

                <div
                  className=" flex gap-5 w-[70%] overflow-hidden "
                >
                  <p>{i + 1}</p>

                  <div className=" flex flex-col items-start gap-1 rounded-2xl">
                    <h1
                      className=" capitalize text-2xl font-medium "
                    >{data.title}
                    </h1>
                    <p
                      className=" text-xl text-gray-400 "
                    >{data.desc}
                    </p>
                  </div>
                </div>

                <button
                  className="capitalize bg-red-600 text-white rounded-md  px-3 py-3"
                  onClick={
                    () => DeleteTodo(i)
                  }
                >Delete
                  <i className="fi fi-rs-trash p-2"></i>
                </button>
              </div>
            ))
          }
        </div>
        <div>
          {
            allTodos.length > 0 &&
            (
              <button
                className=" text-2xl bg-red-500 text-white px-4 py-2 rounded-md "
                onClick={deleteAllTodo}
              >Delete All
              </button>
            )}
        </div>
      </div>

    </>
  )
}

export default App
