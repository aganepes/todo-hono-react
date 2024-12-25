import Todo from "./models/Todo"
import mongoose from "mongoose"
import { Hono } from "hono"
import {cors} from 'hono/cors'

mongoose.connect('mongodb://localhost:27017/example')
  .then(()=>{
    console.log('MongoDb connected')
  })
  .catch((err)=>console.log('MongoDb connection error:',err))


const app = new Hono()

app.use('*',cors({origin:'http://localhost:5173',allowMethods:['GET',"DELETE",'POST','PUT']}))

app.get('/',async(c)=>{
    const todos = await Todo.find()
    return c.json(JSON.stringify(todos)) 
})
app.get('/:id',async(c)=>{
  const id=c.req.param('id')
  try {
    const todo = await Todo.findOne({ _id: id })
    return c.json(JSON.stringify(todo))
  } catch (error) {
    return c.text('Not found : '+id +'  id.')
  }
})
app.post('/',async(c)=>{
  const {name,compiled} = await c.req.json()
      const newTodo = new Todo({name,compiled})
      await newTodo.save()
      return c.json(JSON.stringify(newTodo))
})
app.delete('/:id',async(c)=>{
  const id = c.req.param('id')
  try {
    await Todo.deleteOne({_id:id})
    return c.text('ok',200)
  } catch (error) {
    return c.text('Not found '+id +' id. Not delete.',501)
  }
})
app.put('/:id',async(c)=>{
  const id = c.req.param('id')
  try {
    const {name,compiled}=await c.req.json()
    await Todo.updateOne({_id:id},{name,compiled})
    return c.text('ok',201)
  } catch (error) {
    return c.text('Not found '+ id +' id. Not delete.',501)
  }
})

Bun.serve({fetch:app.fetch,port:Bun.env.PORT||8000})
