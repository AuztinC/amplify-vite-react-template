import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import api from './api/handler' // FILE STORING ALL API FUNCTIONS


const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [scanlog, setScanlog] = useState([]) // ARRAY OF MOST RECENT SCANS

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    api.getScanlog(setScanlog) 
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
      {/* {
      scanlog.length > 0 ? 
      scanlog.map((scan: any, i)=>{
        return (
          <div className="scanned_item">{scan.userName}, {scan.itemName}, {scan.scanMode}, {scan.scanDate} </div>
        )
        
      })
      : null
    } */}
    </main>
  );
}

export default App;
