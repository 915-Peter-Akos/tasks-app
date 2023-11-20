import Task from "../domain/Task";

class TaskRepo {
    constructor() {
        this.tasks = [];
    }

    getAll() {
        return this.tasks;
    }

    getById(id) {
        return this.tasks.find(task => task.id === id);
    }

    getSize() {
        return this.tasks.length;
    }

    add(task) {
        if (task.isValid()) {
            this.tasks.push(task);
            return true;
        }
        return false;
    }

    remove(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    update(id, updatedTask) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1 && updatedTask.isValid()) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
            return true;
        }
        return false;
    }
}


const taskRepo = new TaskRepo();
const dishes = new Task(1, "Task 1", "Do the dishes", "2023-12-12", "2023-10-12", 1, false);
const house = new Task(2, "Task 2", "Clean the house", "2023-12-12", "2023-10-12", 2, false);
const assignment = new Task(3, "Task 3", "Finish the assignment", "2023-12-12", "2023-10-12", 3, false);

taskRepo.add(dishes);
taskRepo.add(house);
taskRepo.add(assignment);

export default taskRepo;