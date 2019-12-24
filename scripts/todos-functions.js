const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }
}

const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    let todoParagraph = document.createElement('span')
    const removeButton = document.createElement('button')

    // setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')

    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(containerEl)

    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        filterTodos(todos, filters)
    })

    if (todo.text.length > 0) {
        todoParagraph.textContent = todo.text
    }

    containerEl.appendChild(todoParagraph)
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        filterTodos(todos, filters)
    })

    

    return todoEl
} 

const leftTodoSummery = (leftTodo) => {
    const leftTodoDOM = document.createElement('h3')
    const plural = leftTodo.length === 1 ? '' : 's'
    leftTodoDOM.classList.add('list-title')
    leftTodoDOM.textContent = `You have ${leftTodo.length} todo${plural} left`
    document.querySelector('#todos').appendChild(leftTodoDOM)
}

const filterTodos = (todos, filters) => {

    const todoEl = document.querySelector('#todos')

    const filteredTodos = todos.filter(todo => {
        const matchTodos = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedTodos = !filters.hideCompleted || !todo.completed
        
        return matchTodos && hideCompletedTodos
    })

    const leftTodo = todos.filter(todo => !todo.completed)

    todoEl.innerHTML = ''

    leftTodoSummery(leftTodo)

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
            const todoParagraph = generateTodoDOM(todo)
            todoEl.appendChild(todoParagraph)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No todos to show'
        todoEl.appendChild(emptyMessage)
    }
    
}