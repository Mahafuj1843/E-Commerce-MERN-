import Swal from "sweetalert2"
import { RemoveTodo } from "../../redux/state/todoSlice"
import store from "../../redux/store/store"

export const todoDeleteAlert = (i) =>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            if(store.dispatch(RemoveTodo(i))){
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            }
        }
      })
}