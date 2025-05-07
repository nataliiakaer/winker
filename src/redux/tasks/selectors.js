export const selectorAllTasks = (state) => state.tasksLists.allTasks;
export const selectorMyTasks = (state) => state.tasksLists.myTasks;
export const selectorTasksAssidnedToMe = (state) => state.tasksLists.assignedTasks;
export const selectorTasksIsLoading = (state) => state.tasksLists.isLoading;
export const selectorTasksError = (state) => state.tasksLists.error;

export const selectorAddTaskModal = (state) => state.taskDetails.modal;
export const selectorTaskDetails = (state) => state.taskDetails.taskDetails;
export const selectorTaskkDetailsIsLoading = (state) => state.taskDetails.isLoading;
export const selectorTaskkDetailsError = (state) => state.taskDetails.error;


