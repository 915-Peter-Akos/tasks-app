class Task {
    static nextId = 1;

    constructor(title, description, dueDate, createDate, priority, isDone) {
        this.id = Task.nextId++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.createDate = createDate;
        this.priority = priority;
        this.isDone = isDone
    }

    isValid() {
        return (
            typeof this.title === 'string' && this.title.trim() !== '' &&
            typeof this.description === 'string' && this.description.trim() !== '' &&
            typeof this.dueDate === 'string' && this.dueDate.trim() !== '' &&
            typeof this.createDate === 'string' && this.createDate.trim() !== ''
        );
    }
}

export default Task;