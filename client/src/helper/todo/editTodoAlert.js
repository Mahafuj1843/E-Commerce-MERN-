import Swal from "sweetalert2"
import { EditTodo } from "../../redux/state/todoSlice"
import store from "../../redux/store/store"

export const todoEditAlert = (i, item) =>{
    Swal.fire({
        title: 'Update Task Name',
        input: 'text',
        inputValue: item,
        inputValidator: (value)=>{
            if(value) store.dispatch(EditTodo({ index: i, task: value}))
        }
      })
}