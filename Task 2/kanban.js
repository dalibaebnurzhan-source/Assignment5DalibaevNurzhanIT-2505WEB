const tasks = [
    { id: 1, title: "Create HTML structure", status: "To do", priority: "High" },
    { id: 2, title: "Write CSS styles", status: "To do", priority: "Medium" },
    { id: 3, title: "Add JavaScript logic", status: "In progress", priority: "High" },
    { id: 4, title: "Review the task", status: "To do", priority: "Low" }
];

function render() {
    document.querySelectorAll('.cards-container').forEach(container => container.innerHTML = '');

    for (let task of tasks) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = `${task.title} [${task.priority}]`;
        card.dataset.id = task.id;

        const moveBtn = document.createElement('button');
        moveBtn.textContent = 'Move ➔';
        moveBtn.classList.add('move-btn');
        card.appendChild(moveBtn);

        let columnSelector = '';
        if (task.status === 'To do') columnSelector = '#todo .cards-container';
        else if (task.status === 'In progress') columnSelector = '#inprogress .cards-container';
        else if (task.status === 'Done') columnSelector = '#done .cards-container';

        const container = document.querySelector(columnSelector);
        if (container) container.appendChild(card);
    }
}

document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('move-btn')) {
        const card = e.target.closest('.card');
        const id = Number(card.dataset.id);
        const task = tasks.find(t => t.id === id);

        if (task.status === 'To do') {
            const inProgressCount = tasks.filter(t => t.status === 'In progress').length;
            if (inProgressCount >= 3) {
                alert('Limit reached: "In progress" column cannot have more than 3 cards!');
                return;
            }
            task.status = 'In progress';
        } else if (task.status === 'In progress') {
            task.status = 'Done';
        } else if (task.status === 'Done') {
            task.status = 'To do';
        }
        render();
    }
});

render();   