let todos = getSavedTodos()

const filters = {
    searchText : '',
    hideCompleted : false
}

filterTodos(todos, filters)

// filter todos
document.querySelector('#filter-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    filterTodos(todos, filters)
})

// handeling form
document.querySelector('#makeTodo').addEventListener('submit', (e) => {
    const text = e.target.elements.addTodo.value.trim()

    e.preventDefault()

    if (text.length > 0) {
        todos.push({
            id : uuidv4(),
            text : text,
            completed : false
        })
        saveTodos(todos)
        filterTodos(todos, filters)
        e.target.elements.addTodo.value = ''
    }
})

// handelling checkbox
document.querySelector('#checkBox').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    filterTodos(todos, filters)
})