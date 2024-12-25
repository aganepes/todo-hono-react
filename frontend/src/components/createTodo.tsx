import { useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'

import styles from './styles/createTodo.module.css'
function CreateTodo() {
    
    const [text,setText]= useState<string>('')

    const addTodo = ()=>{
        fetch("http://localhost:5000/",
            {method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({name:text,compiled:false})
        })
        .then(()=>{
            location.reload()
        })
    }
    return (
        <div className={styles.cont_input}>
            <input type="text" name="name" 
                placeholder='Input to todo ...' 
                value={text} 
                onChange={(e)=>setText(e.target.value)}
                />
            <button type="button" className={styles.btn} onClick={addTodo}><IoAddCircle size={22}/></button>
        </div>
    )
}

export default CreateTodo