export function findActivityById(activities, id) {
    return activities.filter((activity) => activity.id === id)
}