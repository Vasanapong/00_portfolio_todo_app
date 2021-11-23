import './ViewTask.css'
import { IoMdSkipBackward } from 'react-icons/io';
import { AiOutlineEdit,AiOutlineDelete } from 'react-icons/ai';
import { useContext } from 'react';
import { todoContext } from '../App';

const ViewTask = () =>{

    const { setTaskViewComponent,allTask,setAllTask,setCurrentEdit } = useContext(todoContext)

    const handleDelete = (item) => {
        setAllTask(
            allTask.filter(task=>{
                if(task.taskId !== item.taskId){
                    return task
                }
                return null
            })
        )
    }

    return(
        <div className="view-task">
            <div className="view-task__title">
                <div className="view-task__icon" onClick={()=>setTaskViewComponent('add')}><IoMdSkipBackward/><span> Add task</span></div>
                <p className="view-task__alert">All Things todo</p>
            </div>
            { 
            allTask.length > 0 && 
                allTask.map((item,index)=>{
                    if(window.screen.width < 768){
                        if(item.taskNote.length > 15){
                            item.taskNote = item.taskNote.slice(0,15) + ' ... '
                        }
                    }else if(window.screen.width > 768 && window.screen.width < 1024){
                        if(item.taskNote.length > 50){
                            item.taskNote = item.taskNote.slice(0,50) + ' ... '
                        }
                    }else{
                        if(item.taskNote.length > 100){
                            item.taskNote = item.taskNote.slice(0,100) + ' ... '
                        }
                    }
                    return(
                        <div className="view-task__item" key={index}>
                            <div className="view-task__note-group">
                                <p className="view-task__item-title">Title : {item.taskName}</p>
                                <p className="view-task__item-note">Note : {item.taskNote}</p>
                                <p className="view-task__item-time">Date : {item.taskTime}</p>
                            </div>
                            <div className="view-task__menu-group">
                                <p className="view-task__menu-edit" onClick={()=>{setCurrentEdit(item);setTaskViewComponent('edit')}}><AiOutlineEdit/></p>
                                <p className="view-task__menu-delete" onClick={()=>handleDelete(item)}><AiOutlineDelete/></p>
                            </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default ViewTask;