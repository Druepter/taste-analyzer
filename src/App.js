import React, { useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'
import axios from "axios";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  /*useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])*/

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }



  const CLIENT_ID = "3795ba2e521e49a2b84c2fa29eb5f18d"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

   

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = "";
      window.localStorage.setItem("token", token)
      
    }

    setToken(token)

  }, [])


  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token");
  }


  const getFavoriteArtists = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    console.log(data);

  }

  var scope = 'user-read-private user-read-email user-top-read';

  return (
    <>

      <h1>Taste Analyzer</h1>
      {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`}>Login to Spotify</a>

      : <button onClick={logout}>Logout</button>} 


       {token ?
        <button onClick={getFavoriteArtists}>
          Get Favorite Artists
        </button>
        :
        <p>Bitte einloggen</p>
       } 


      {/*<TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
  <div>{todos.filter(todo => !todo.complete).length} left to do</div>*/}
    </>
  );
}

export default App;
