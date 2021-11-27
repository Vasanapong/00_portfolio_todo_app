import './App.css';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import ViewTask from './components/ViewTask';
import { useState, createContext } from 'react';

const todoContext = createContext()

function App() {

  const [allTask, setAllTask] = useState(()=>{
    let initialValue = localStorage.getItem('allTaskLocal')
    initialValue = JSON.parse(initialValue)
    return initialValue || [];
  })
  const [currentEdit, setCurrentEdit] = useState('')
  const [taskViewComponent, setTaskViewComponent] = useState('add')

  return (
    <todoContext.Provider value={{setTaskViewComponent,setAllTask,setCurrentEdit,allTask,currentEdit}}>
      <div className="App">
        {taskViewComponent === 'add' && <AddTask />}
        {taskViewComponent === 'view' && <ViewTask/>}
        {taskViewComponent === 'edit' && <EditTask/>}
      </div>
    </todoContext.Provider>
  );
}

export { todoContext }
export default App;
