export function findActivityById(activities, id) {
    return activities.find((activity) => activity.id === parseInt(id))
}

export function findActivityByName(activities, name) {
    return activities.find((activity) => activity.name === name)
}