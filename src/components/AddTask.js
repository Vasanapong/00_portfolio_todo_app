import './AddTask.css'
import { IoMdSkipBackward } from 'react-icons/io';
import { useState,useContext,useEffect } from 'react';
import { todoContext } from '../App';

const AddTask = () =>{

    const defaultTodo = {taskName:'',taskTime:'',taskNote:''}
    const [todoData, setTodoData] = useState(defaultTodo)
    const [checkNoteData, setCheckNoteData] = useState(false)
    const [checkAddData, setCheckAddData] = useState(false) 
    const { setTaskViewComponent,setAllTask,allTask } = useContext(todoContext)

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(checkNoteData){
            todoData.taskId = Date.now().toString()
            setAllTask((prev)=>[todoData,...prev])
            setTodoData(defaultTodo)
            setCheckAddData(true)
            setCheckNoteData(false)
        }
    }

    useEffect(() => {
        localStorage.setItem('allTaskLocal',JSON.stringify(allTask))
        if(todoData.taskName.length > 0 && todoData.taskTime.length > 0 && todoData.taskNote.length > 0){
            setCheckNoteData(true)
        }else{
            setCheckNoteData(false)
        }
    },[todoData,allTask])

    return(
        <div className="add-task" onSubmit={(e)=>handleSubmit(e)}>
            <div className="add-task__title">
                <div className="add-task__icon" onClick={()=>setTaskViewComponent('view')}><IoMdSkipBackward/><span> View all tasks</span></div>
                { checkAddData ? 'Task is added !' : 'Add new task ...'}
            </div>
            <form className="add-task__form">
                <div className="add-task__form-task-name">
                    <p>Task name</p>
                    <input 
                        type="text"
                        placeholder="Example: Learn Node.js"
                        name="taskName" 
                        onChange={(e)=>setTodoData(prev=>{setCheckAddData(false);return{...prev,taskName:e.target.value}})} 
                        value={todoData.taskName}
                    />
                </div>
                <div className="add-task__form-task-time">
                    <p>Date Time</p>
                    <input 
                        type="text" 
                        placeholder="Example: 10-02-2021 20:00" 
                        name="taskTime"
                        onChange={(e)=>setTodoData(prev=>{setCheckAddData(false);return{...prev,taskTime:e.target.value}})} 
                        value={todoData.taskTime}/>
                </div>
                <div className="add-task__form-task-notes">
                    <p>Note</p>
                    <textarea 
                        placeholder="Example: about express" 
                        name="taskNote"
                        onChange={(e)=>setTodoData(prev=>{setCheckAddData(false);return{...prev,taskNote:e.target.value}})} 
                        value={todoData.taskNote}/>
                </div>
                <div className="add-task__form-task-submit">
                    <p>
                        <input type="submit"  className={checkNoteData ? "add-task__form-submit-button-active" : "add-task__form-submit-button"}/>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AddTask;