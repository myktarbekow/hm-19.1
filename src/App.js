import { useEffect, useState } from "react";
import "./App.css";
import Items from "./Items";

function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  function addTodo(event) {
    setValue(event.target.value);
  }

  const addTodoPost = async () => {
    await fetch("https://fake-api-backend.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({ name: value }),
      headers: { "Content-Type": "application/json" },
    });
    addTodoGed();
  };

  async function addTodoGed() {
    const response = await fetch(
      "https://fake-api-backend.herokuapp.com/users"
    );
    const data = await response.json();
    console.log(data);
    const apdaitedData = data.filter((item) => {
      return { name: item.name, id: item.id };
    });

    setTodo(apdaitedData);
  }

  useEffect(() => {
    addTodoGed();
  }, []);

  async function deleteId(id) {
    await fetch(`https://fake-api-backend.herokuapp.com/users/${id}`, {
      method: "DELETE",
    });
    addTodoGed();
  }

  function submitHandler(event) {
    event.preventDefault();
    setTodo((prev) => [...prev, { name: value }]);

    addTodoPost();

    setValue("");
    console.log(todo);
  }
  const putHandler = async (putId, tast, addChandge) => {
    console.log(putId, "put id");
    deleteId(putId);
    const response = await fetch(
      `https://fake-api-backend.herokuapp.com/users`,
      {
        method: "PUT",
        body: JSON.stringify({ name: tast }),
      }
    );
    console.log(response);
    // addTodoGed()
    addChandge();
  };

  return (
    <>
      <form className="App" onSubmit={submitHandler}>
        <input value={value} type="text" onChange={addTodo} />
        <button>Добавить</button>
      </form>
      <div>
        <ul>
          {todo.map((el, index) => (
            <li key={index}>
              <Items
                id={el.id}
                name={el.name}
                deleteId={deleteId}
                getData={addTodoGed}
                editData={putHandler}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
