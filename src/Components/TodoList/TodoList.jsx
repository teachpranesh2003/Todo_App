
import TodoListItem from "./TodoListItem/TodoListItem"

// const TodoList = ()=>{
//     return(
//         <>
//         {list.map((item,index)=> <TodoListItem key={index}item={item}/>)}
//         </>
        
//     )
// }
const TodoList =(props) => {
   const{deleteItem,list ,triggerEdit }= props
    if(list.length <=0){
        return(
            <center>No items to display my boy!</center>
        )
    }
    return(
        <>
        {list.map((item,index)=>(<TodoListItem 
            key={index}
            item={item}
            index={index}
            onDelete={deleteItem}
            onEdit ={triggerEdit}/>
                
            
))}</>
)
            

}
export default TodoList  