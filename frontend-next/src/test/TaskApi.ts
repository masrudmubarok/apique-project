import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from '@/utils/api';

(async () => {
  try {
    const newTask = await createTask('Test Task');
    console.log('Created Task:', newTask);

    const tasks = await getTasks();
    console.log('All Tasks:', tasks);

    const updated = await updateTask(newTask.id, 'Updated Task', 'in progress');
    console.log('Updated Task:', updated);

    const statusUpdated = await updateTaskStatus(newTask.id, 'done');
    console.log('Status Updated:', statusUpdated);

    const deleted = await deleteTask(newTask.id);
    console.log('Deleted:', deleted);
  } catch (err) {
    console.error(err);
  }
})();