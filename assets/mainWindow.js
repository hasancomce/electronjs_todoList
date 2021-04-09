const electron = require('electron');
const { ipcRenderer } = electron;

checkTodoCount()

const inputValue = document.querySelector("#inputValue")
const addBtn = document.querySelector("#addBtn")

inputValue.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        ipcRenderer.send("key:newTodoSave", { ref: "main", value: e.target.value })
        e.target.value = ""
    }
})

addBtn.addEventListener("click", () => {
    ipcRenderer.send("key:newTodoSave", { ref: "main", value: inputValue.value })
    inputValue.value = ""
})

ipcRenderer.on("todo:addItem", (err, todo) => {
    
    // container
    const container = document.querySelector(".todo-container")
    
    // row
    const row = document.createElement("div")
    row.className = "row"

    // col
    const col = document.createElement("div")
    col.className = "todo-item p-2 mb-3 text-light bg-dark col-md-8 offset-2 shadow card d-flex justify-content-center flex-row align-items-center"

    // p
    const p = document.createElement("p")
    p.className = "m-0 w-100"
    p.innerText = todo.value

    const deleteBtn = document.createElement("button")
    deleteBtn.className = "btn btn-sm btn-outline-danger flex-shrink-1"
    deleteBtn.innerText = "X"

    col.appendChild(p)
    col.appendChild(deleteBtn)

    row.appendChild(col)

    container.appendChild(row)

    checkTodoCount()

    deleteBtn.addEventListener("click", (e) => {
        if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
            //
            console.log("Silindi!", e.target.parentNode.parentNode);
            e.target.parentNode.parentNode.remove()
            checkTodoCount()
        }
    })
})

function checkTodoCount() {
    const container = document.querySelector(".todo-container")
    const alertContainer = document.querySelector(".alert-container")
    document.querySelector(".total-count-container").innerText = container.children.length
    if (container.children.length !== 0) {
        alertContainer.style.display = "none"
    } else {
        alertContainer.style.display = "block"
    }
}