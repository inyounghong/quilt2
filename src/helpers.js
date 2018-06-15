
/**
 * Checks if string is valid v4 id
 */
export function isV4(id: string): boolean {
  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
}
//
// function getTaskById(tasks, id) {
//     return tasks.find(task => task.id === id);
// }
//
// function getStoryByTask(stories, id) {
//     return stories.find(story => story.tasks.indexOf(id) > -1);
// }
