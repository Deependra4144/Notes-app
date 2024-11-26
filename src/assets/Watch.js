export function time() {
    let date = new Date();
    return `${date.getHours() % 12} : ${date.getMinutes()} : ${date.getSeconds()}`
}

export function dt() {
    let date = new Date();
    return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
}