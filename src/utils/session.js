
export function getSession(key) {
    return sessionStorage.getItem(key)
}
export function setSession(key, val) {
    return sessionStorage.setItem(key, val)
}
export function clearSession() {
    return sessionStorage.clear()
}