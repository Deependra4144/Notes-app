export function StorageData() {
    const notes = localStorage.getItem('Notes')
    return notes ? JSON.parse(notes) : []
}

export function handlePinn(id) {
    let arr = StorageData()
    let indexp = arr.findIndex(e => e.Id === id)
    arr[indexp].ispinned = !arr[indexp].ispinned
    localStorage.setItem('Notes', JSON.stringify(arr))

}
export function pinnNotesData() {
    let arr = undeletedNotes()
    let filtered = arr.filter(e => e.ispinned === true)
    return filtered.length > 0 ? filtered : []
}

export function deletedNotes() {
    let arr = StorageData()
    let filtered = arr.filter(note => note.isDeleted === true)
    return (filtered)
}
export function undeletedNotes() {
    let arr = StorageData()
    let filtered = arr.filter(note => note.isDeleted !== true)
    return (filtered)
}

export function movetoRecycleBin(id) {
    let arr = StorageData();
    let indexp = arr.findIndex(e => e.Id === id)
    arr[indexp].isDeleted = !arr[indexp].isDeleted
    localStorage.setItem('Notes', JSON.stringify(arr))

}

export function permanentlyDelete(id) {
    let arr = StorageData();
    let indexp = arr.findIndex(e => e.Id === id)
    arr.splice(indexp, 1)
    localStorage.setItem('Notes', JSON.stringify(arr))

}
export function restoreNote(id) {
    let arr = StorageData();
    let indexp = arr.findIndex(e => e.Id === id)
    arr[indexp].isDeleted = false
    localStorage.setItem('Notes', JSON.stringify(arr))

}





