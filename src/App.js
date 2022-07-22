import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(0);
  const [myBook, setMyBook] = useState(() => {
    const savedBook = localStorage.getItem("myBook");
    if (savedBook) {
      return JSON.parse(savedBook);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("myBook", JSON.stringify(myBook));
  }, [myBook]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeAuthor(e) {
    setAuthor(e.target.value);
  }
  function handleChangeGenre(e) {
    setGenre(e.target.value);
  }
  function handleChangePrice(e) {
    setPrice(e.target.value);
  }

  function handleDelete(id) {
    const delBook = myBook.filter((element) => element.id !== id);

    setMyBook([...delBook]);
  }

  function handleEdit(id) {
    const editedBook = myBook.find((element) => element.id === id);
    setTitle(editedBook.title);
    setAuthor(editedBook.author);
    setGenre(editedBook.genre);
    setPrice(editedBook.price);
    setIsEditing(id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(isEditing);
    if (isEditing) {
      const editedBook = myBook.find((ele) => ele.id === isEditing);
      const updatedBook = myBook.map((ele) =>
        ele.id === editedBook.id
          ? (ele = { id: ele.id, title, author, genre, price })
          : {
              id: ele.id,
              title: ele.title,
              author: ele.author,
              genre: ele.genre,
              price: ele.price,
            }
      );
      console.log(updatedBook);
      setMyBook(updatedBook);
      setTitle("");
      setAuthor("");
      setGenre("");
      setPrice("");
      setIsEditing(0);
      return;
    }

    if (title !== "" && author !== "" && genre !== "" && price !== "") {
      setMyBook((prevState) => [
        { id: `${title}-${Date.now()}`, title, author, genre, price },
        ...prevState,
      ]);
      setTitle("");
      setAuthor("");
      setGenre("");
      setPrice("");
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1> MyBook List</h1>
        <form className="bookform" onSubmit={handleSubmit}>
          <b>Title:</b>
          <input className="inputItem" type="text" value={title} onChange={handleChangeTitle} />
          <b>Author:</b>
          <input className="inputItem" type="text" value={author} onChange={handleChangeAuthor} />
          <b>Genre:</b>
          <input className="inputItem" type="text" value={genre} onChange={handleChangeGenre} />
          <b>Price:</b>
          <input className="inputItem" type="number" value={price} onChange={handleChangePrice} />
          <button type="submit">{isEditing ? "Edit" : "Add"}</button>
        </form>
        <ul className="allBook">
          {myBook.map((list) => (
            <li className="singleBook">
              <span className="text" id={list.id} key={list.id}>
                <div>Title : {list.title}</div>
                <div>Author : {list.author}</div>
                <div>Genre : {list.genre}</div>
                <div>Price : {list.price}</div>
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
