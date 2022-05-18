import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(0);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleDelete(id) {
    const delTodo = todos.filter((element) => element.id !== id);

    setTodos([...delTodo]);
    // console.log(typeof delTodo);
  }

  function handleEdit(id) {
    const editedTodo = todos.find((element) => element.id === id);
    setInput(editedTodo.input);
    setIsEditing(id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(isEditing);
    if (isEditing) {
      const editedTodo = todos.find((ele) => ele.id === isEditing);
      // console.log(editedTodo);
      const updatedTodo = todos.map((ele) =>
        ele.id === editedTodo.id
          ? (ele = { id: ele.id, input })
          : { id: ele.id, input: ele.input }
      );
      console.log(updatedTodo);
      setTodos(updatedTodo);
      setInput("");
      setIsEditing(0);
      return;
    }

    if (input !== "") {
      setTodos((prevState) => [
        { id: `${input}-${Date.now()}`, input },
        ...prevState,
      ]);
      setInput("");
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo List</h1>
        <form className="todoform" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
          <button type="submit">{isEditing ? "Edit" : "Add"}</button>
        </form>
        <ul className="allTodo">
          {todos.map((list) => (
            <li className="singleTodo">
              <span className="text" id={list.id} key={list.id}>
                {list.input}
              </span>
              <button onClick={() => handleEdit(list.id)}>Edit</button>
              <button onClick={() => handleDelete(list.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
