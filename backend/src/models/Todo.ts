import mongoose,{Schema,Document} from "mongoose";

interface Todo extends Document{
  name:string;
  compiled:boolean;
}
const todoSchema :Schema = new Schema({
  name:{type:String,require:true},
  compiled:{type:Boolean,required:true,default:false}
})
const Todo=mongoose.model<Todo>('Todo',todoSchema)


export default Todo;