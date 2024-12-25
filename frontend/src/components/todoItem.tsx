import {useState } from 'react'
import {MdDelete} from 'react-icons/md'
import {TfiPencil} from 'react-icons/tfi'
import {IoClose} from 'react-icons/io5'
import { BiSolidSave } from 'react-icons/bi'
import styles from './styles/todoItem.module.css'

function TodoItem({id,name,compiled}:{id:string,name:string,compiled:boolean}){

    const [Compiled,setCompiled]=useState<boolean>(compiled)
    const [Name,setName]=useState<string>(name)
    const [showName,setShowName]=useState<boolean>(true)
    const [deleteTodo,setDeleteTodo]=useState<boolean>(false)
    const [showAlert,setShowAlert] = useState<boolean>(false)

    const onDelete=()=>{
        fetch(`http://localhost:5000/${id}`,{method:"DELETE"})
        .then(()=>{
            setDeleteTodo(true)
        })
    }

    const Update=(val:boolean|string)=>{
        if(typeof val == 'boolean')
            setCompiled(val)
        else setShowName(true)

        fetch(`http://localhost:5000/${id}`,
            {method:'PUT',
            body:JSON.stringify({compiled:!Compiled,name:Name}),
            headers:{'Content-Type':'application/json'}
            })
        .then((res)=>{
            if(res.ok)
                setShowAlert(true)
                setTimeout(()=>setShowAlert(false),2000)
        })
    }
    
    return (<>
        {!deleteTodo&&<div className={styles.cont} key={id}>
            <input type="checkbox" id={id}  defaultChecked={Compiled} onChange={(e)=>Update(e.target.checked)}/>
            <label className={styles.checkbox} htmlFor={id}>
            {showName&&
                <p className={!Compiled ? styles.text :styles.close}>{Name}</p>
            }
            </label>
            {!showName && 
                <div className={styles.edit}>
                <input type="text" value={Name} onChange={(e)=>setName(e.target.value)}/>
                <button type="button" onClick={()=>Update(name)}><BiSolidSave size={20}/></button>
                </div>
            }
            <div className={styles.btns}>
            <button type="button" onClick={()=>setShowName(!showName)}>{showName ? <TfiPencil size={20}/>:<IoClose size={20}/>}</button>
            <button type="button" onClick={onDelete}><MdDelete size={20}/></button>
            </div>
        </div>}
        {showAlert&&<div className="alert">Updating...</div>}
        </>
    )
}

export default TodoItem