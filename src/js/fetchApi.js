import { array } from "prop-types";

const API_URL = "https://playground.4geeks.com/todo"
const user = "dshustin"

export const fetchToDo = (setToDos) => {
    fetch(`${API_URL}/users/${user}`)
        .then((response) => {
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            console.log("raw response from api:", response);
            return response.json();
        })
        .then((data) => {
            console.log("todo list from api:", data);
            if (data && Array.isArray(data.todos)) {
                setToDos(data.todos);
            } else {
                console.error("fetch data is not an array", data.todos);
                setToDos([]);
            }

        })
        .catch((error) => {
            console.error("We wern't able to get your Api", error);
        });
};
export const deleteToDo = (setToDos, todoId, deletedTodo) => {
    fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => {
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            // console.log("raw response from api:", response);
            console.log("todo deleted successfully in Api:", deletedTodo);
           fetchToDo(setToDos)
        })
        .catch((error) => {
            console.error("We wern't able to delete your todo", error);
        });
} 
export const addToDo =(inputValue, setToDos) => {
    fetch(`${API_URL}/todos/${user}`, {
        method: "POST",
        body: JSON.stringify({
            label: inputValue.trim(),
            is_done: false
        }),
        headers: { "Content-Type": "application/json" }
        

    })
        .then((response) => {
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            console.log("New todo added:", inputValue.trim());
            fetchToDo(setToDos)
        })
        .catch((error) => {
            console.error("We wern't able to add your todo", error);
        });
}
export const deleteUsers =(setToDos) => {
    fetch(`${API_URL}/users/${user}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => {
            if(!response.ok) throw new Error(`Status: ${response.status}`);
            console.log("User and Todo has been deleted.")
            alert("Things wont be saved to your user anymore.")
            setToDos([])
        })
        .catch((error) => {
            console.error("User was not able to be deleted.", error)
        })
}
export const addUser =(setToDos) => {
    fetch(`${API_URL}/users/${user}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => {
            if(!response.ok) throw new Error(`Status: ${response.status}`);
            console.log("User has been added successfully")
            alert("Things will now be saved to your user.")
            fetchToDo(setToDos)
        })
        .catch((error) => {
            console.error("User was not able to be made at this time, try again.")
        })
}
// todo 
// deleteuser
// adduser