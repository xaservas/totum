export function findActivityById(activities, id) {
    return activities.find((activity) => activity.id === id)
}

export function findActivityByName(activities, name) {
    return activities.find((activity) => activity.name === name)
}