
import './App.css';
import { useState ,useEffect} from 'react';
import TodoList from './Components/TodoList/TodoList';
import NewItem from './Components/NewItem/NewItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
import {nanoid} from 'nanoid'
// const DEFAULT_LIST = [
//   {
//       title: "Study Js",
//       priority:'high',
//       id:nanoid()
//   },
//   {
//       title: "Study CSS",
//       priority:'medium',
//       id:nanoid()
//   },
//   {
//       title: "Study HTML",
//       priority:'low',
//       id:nanoid()
//   }
// ]
const App=()=>{
  const [list,setList] = useState([])
  const[editState,setEditState]=useState({})

  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/list').then((res)=>{
      res.json().then((json)=>{
        setList(json)
      })
    }).catch(()=>{
      console.log("eroor"); 
    })
  },[])
  console.log(editState);
  const deleteItem = (id)=>{
        const filteredList = list.filter((item)=>item.id !==id)
        setList([...filteredList])
  }
  const triggerEdit=(item)=>{
     setEditState(item)
  }
  const editItem = (updatedItem)=>{
    const updatedList=list.map((item)=>{
      if (item.id === updatedItem.id){
        return updatedItem;
      }
     
        return item
      
    })
    setList([...updatedList])
  }
  const addItem = (item)=>{
    item.id=nanoid()
    // setList((prev)=>[item,...prev])
    fetch('http://localhost:3000/api/v1/list',
    {
    method:'POST',
    headers:{
      'Accept':'application/json, text/plain, */*',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(item)
    }).then((res)=>{
      setList((prev)=>[item,...prev])
      toast.success("added successfully")
      })
    }

  
  return (
    <div className="app">
      <h1 className='title'>Todo-List</h1>
           <NewItem addItem={addItem} editState={editState} editItem={editItem}/>
      <TodoList list = {list} deleteItem={deleteItem} triggerEdit={triggerEdit}/>
      {/* <TodoList/> */}
      
    </div>
  
  )
}

export default App;
