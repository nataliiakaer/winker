export const selectorAllTasks = (state) => state.tasksLists.allTasks;
export const selectorMyTasks = (state) => state.tasksLists.myTasks;
export const selectorTasksAssidnedToMe = (state) => state.tasksLists.assignedTasks;
export const selectorTasksIsLoading = (state) => state.tasksLists.isLoading;
export const selectorTasksError = (state) => state.tasksLists.error;

export const selectorAddTaskModal = (state) => state.taskDetails.modal;
export const selectorTaskDetails = (state) => state.taskDetails.taskDetails;
export const selectorTaskDetailsIsLoading = (state) => state.taskDetails.isLoading;
export const selectorTaskDetailsError = (state) => state.taskDetails.error;
export const selectorTaskComments = (state) => state.taskDetails.comments;



