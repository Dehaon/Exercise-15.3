const taskList = document.querySelector('.tasks-list');

const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
];

tasks.forEach(task => putTask(task));
// putTask(tasks);



const createTaskForm = document.querySelector('.create-task-block');
    createTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // console.log(event.target.taskName.value);
        const newTaskText = `${event.target.taskName.value.trim()}`;
        const newTask = {
            id: `${Date.now()}`,
            completed: false,
            text: newTaskText
        }
        // console.log(newTask.text);
        const sameName = tasks.some((task) => {
            return task.text === newTask.text
            });
        // console.log('Proverka 1', sameName);

        if (sameName) {
            createTaskError('Задача с таким названием уже существует.');
            return;
        } else if (newTask.text === '') {
            createTaskError('Название задачи не должно быть пустым.');
            return;
        } else {
            removeTaskError();
            tasks.push(newTask);
            // taskList.innerHTML = '';
            putTask(newTask);
        }
    });

function removeTaskError() {
    const createTaskForm = document.querySelector('.create-task-block');
    const foundError = createTaskForm.querySelectorAll('.error-message-block')
    foundError.forEach(error => error.remove());
}

function createTaskError(text) {
    removeTaskError();
    const createTaskForm = document.querySelector('.create-task-block');
    const taskError = document.createElement('span');
        taskError.className = 'error-message-block';
        taskError.textContent = text;        
        createTaskForm.append(taskError);
}

function putTask(task) {
    const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.dataset.taskId = `${task.id}`;
        taskList.append(taskItem);
    const taskItem_mainContainer = document.createElement('div');
        taskItem_mainContainer.className = 'task-item__main-container';
        taskItem.append(taskItem_mainContainer);
    const taskItem_mainContent = document.createElement('div');
        taskItem_mainContent.className = 'task-item__main-content';
        taskItem_mainContainer.append(taskItem_mainContent);
    const checkboxForm = document.createElement('form');
        checkboxForm.className = 'checkbox-form'
        taskItem_mainContent.append(checkboxForm);
    const checkboxFormInput = document.createElement('input');
        checkboxFormInput.className = 'checkbox-form__checkbox';
        checkboxFormInput.type = 'checkbox';
        checkboxFormInput.id = `task-${task.id}`;
        checkboxForm.append(checkboxFormInput);
    const checkboxFormLabel = document.createElement('label');
        checkboxFormLabel.htmlFor = `task-${task.id}`;
        checkboxForm.append(checkboxFormLabel);
    const taskItem_text = document.createElement('span');
        taskItem_text.className = 'task-item__text';
        taskItem_text.textContent = `${task.text}`;
        taskItem_mainContent.append(taskItem_text);
    const deleteButton = document.createElement('button');
        deleteButton.classList.add('task-item__delete-button')
        deleteButton.classList.add('default-button');
        deleteButton.classList.add('delete-button');    
        deleteButton.dataset.deleteTaskId = `${task.id}`;
        deleteButton.textContent = 'Удалить';
        taskItem_mainContainer.append(deleteButton);
}

//// Блок 3-его задания
// Создал модальное окно
const body = document.querySelector('body');
const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    modalOverlay.classList.add('modal-overlay_hidden');
    body.insertAdjacentElement('afterbegin', modalOverlay);
const deleteModal = document.createElement('div');
    deleteModal.className = 'delete-modal';
    modalOverlay.append(deleteModal);
const deleteModalQuestion = document.createElement('h3');
    deleteModalQuestion.className = 'delete-modal__question';
    deleteModalQuestion.textContent = 'Вы действительно хотите удалить эту задачу?';
    deleteModal.append(deleteModalQuestion);
const deleteModalButtons = document.createElement('div');
    deleteModalButtons.className = 'delete-modal__buttons';
    deleteModal.append(deleteModalButtons);
const cancelDeleteButton = document.createElement('button');
    cancelDeleteButton.classList.add('delete-modal__button');
    cancelDeleteButton.classList.add('delete-modal__cancel-button');
    cancelDeleteButton.textContent = 'Отмена';
    deleteModalButtons.prepend(cancelDeleteButton);
const confirmDeleteButton = document.createElement('button');
    confirmDeleteButton.classList.add('delete-modal__button');
    confirmDeleteButton.classList.add('delete-modal__confirm-button');
    confirmDeleteButton.textContent = 'Удалить';
    deleteModalButtons.prepend(confirmDeleteButton);


// создал переменные для записи элемента для удаления
let elementsIndexForDelete;
let taskForDelete;

// при клике в модальном окне удаляю сохраненный элемент из массива и со страницы
confirmDeleteButton.addEventListener('click', (event) => {
    console.log('удалить');
    tasks.splice(elementsIndexForDelete, 1);
    taskForDelete.remove();
    modalOverlay.classList.add('modal-overlay_hidden');
}); 

// отмена просто скрывает модальное окно
cancelDeleteButton.addEventListener('click', () => {
    modalOverlay.classList.add('modal-overlay_hidden');
});

// Клик по кнопке удалить, проверка на кнопку. Если проходит открывает модальное окно, сохраняет индекс таска и ссылку на див который собираемся удалить. 
taskList.addEventListener('click', (event) => {
    // console.log('target', event.target);
    const isDeleteButton = event.target.closest('.task-item__delete-button');

    if (isDeleteButton) {
        modalOverlay.classList.remove('modal-overlay_hidden');
        elementsIndexForDelete = tasks.findIndex(task => task.id === event.target.dataset.deleteTaskId);
        // console.log(elementsIndexForDelete);
        taskForDelete = event.target.closest('.task-item');
        // console.log(taskForDelete);        
    }
});

