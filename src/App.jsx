import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
  }, []);

  const saveLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let dl = todos.filter((item) => item.id !== id);
    setTodos(dl);
    saveLS();
  };

  const handleDelete = (id) => {
    let newTods = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTods);
    saveLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLS();
  };

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4 items-center">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            className="w-full rounded-full px-5 py-1"
            type="text"
            value={todo}
          />
          <button
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md font-bold disabled:bg-violet-500 w-full"
            onClick={handleAdd}
            disabled={todo.length <= 3}
          >
            save
          </button>
        </div>
        <input
        className="my-4 "
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        Show Finished
        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item, index) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  className="todo flex w-full max-w-xs my-3 justify-between"
                  key={index}
                >
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                      onChange={handleCheckbox}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                    <object data="" type=""></object>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold"
                      onClick={() => handleDelete(item.id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
