import { useEffect, useState } from 'react'
import CreateTodo from './components/createTodo'
import TodoItem from './components/todoItem'
import './App.css'

type todoType={
  _id:string
  name:string,
  compiled:boolean,
}
function App() {
  const [todos, setTodos] = useState<todoType[]>([])
  function getData() {
    fetch('http://localhost:5000')
    .then(async res=>{
      const json = await res.json()
      const data = JSON.parse(json)
      setTodos(data)
    })
  }
  useEffect(()=>{
      getData()
  },[])

  return (<div id='cont'>
    <CreateTodo/>
    <div className='list-count'>Count {todos.length} todos.</div>
    <div id='list'>
    {todos.map((value)=>{return <TodoItem id={value._id} name={value.name} compiled={value.compiled}/>})}
    </div>
  </div>)
}

export default App
