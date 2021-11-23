import './EditTask.css'
import { IoMdSkipBackward } from 'react-icons/io';
import { useState,useContext,useEffect } from 'react';
import { todoContext } from '../App';

const EditTask = () =>{

    const { setTaskViewComponent,currentEdit,allTask,setAllTask } = useContext(todoContext)
    
    const [checkNoteData, setCheckNoteData] = useState(false)
    const [checkAddData, setCheckAddData] = useState(false) 
    const [ editData, setEditData ] = useState(currentEdit)

    const handleEditSubmit = (e) =>{
        e.preventDefault();
        setAllTask(
            allTask.map(prev=>{
                if(prev.taskId === editData.taskId){
                    return editData
                }else{
                    return prev
                }
            })
        )
        setTaskViewComponent('view')
    }

    useEffect(() => {
        if(editData.taskName.length > 0 && editData.taskTime.length > 0 && editData.taskNote.length > 0){
            setCheckNoteData(true)
        }else{
            setCheckNoteData(false)
        }
    },[editData])

    return(
        <div className="edit-task">
            <div className="edit-task__title">
                <div className="edit-task__icon" onClick={()=>setTaskViewComponent('view')}><IoMdSkipBackward/><span> View all tasks</span></div>
                { checkAddData ? 'Task updated !' : 'Edit task ...'}
            </div>
            <form className="edit-task__form" onSubmit={(e)=>handleEditSubmit(e)}>
                <div className="edit-task__form-task-name">
                    <p>Task name</p>
                    <input 
                        type="text"
                        placeholder="Example: Learn Node.js"
                        name="taskName" 
                        onChange={(e)=>setEditData(prev=>{setCheckAddData(false);return{...prev,taskName:e.target.value}})} 
                        value={editData.taskName}
                    />
                </div>
                <div className="edit-task__form-task-time">
                    <p>Date Time</p>
                    <input 
                        type="text" 
                        placeholder="Example: 10-02-2021 20:00" 
                        name="taskTime"
                        onChange={(e)=>setEditData(prev=>{setCheckAddData(false);return{...prev,taskTime:e.target.value}})} 
                        value={editData.taskTime}
                    />
                </div>
                <div className="edit-task__form-task-notes">
                    <p>Note</p>
                    <textarea 
                        placeholder="Example: about express" 
                        name="taskNote"
                        onChange={(e)=>setEditData(prev=>{setCheckAddData(false);return{...prev,taskNote:e.target.value}})} 
                        value={editData.taskNote}
                    />
                </div>
                <div className="edit-task__form-task-submit">
                    <p>
                        <input type="submit" value="Edit" className={checkNoteData ? "edit-task__form-submit-button-active" : "edit-task__form-submit-button"}/>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default EditTask;