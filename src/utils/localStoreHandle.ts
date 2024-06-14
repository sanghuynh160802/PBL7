function saveCheck(isChecked: boolean) {
  localStorage.setItem('isChecked', JSON.stringify(isChecked))
}

function getCheck() {
  const isChecked = localStorage.getItem('isChecked')
  return isChecked ? JSON.parse(isChecked) : false
}

function removeToken() {
  localStorage.removeItem('token')
}

export { getCheck, removeToken, saveCheck }
