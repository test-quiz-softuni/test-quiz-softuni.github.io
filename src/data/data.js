import { clearUserData, setUserData } from '../utilities.js'
import * as api from './api.js'

function setPointer(name, id){
    return {
        __type: "Pointer",
        'className': name,
        'objectId': id
    }
}

function setOwner(object){
    const userId = JSON.parse(sessionStorage.getItem('userData')).objectId
    const result = Object.assign({}, object)
    result.owner = setPointer('_User', userId)
    return result
}

export async function login(username, password) {
    const result = await api.post('/login', { username, password })
    const userData = {
        objectId: result.objectId,
        username: username,
        sessionToken: result.sessionToken
    }
    setUserData(userData)
    return result
}
export async function register(email, username, password) {
    const result = await api.post('/users', { email, username, password })
    const userData = {
        objectId: result.objectId,
        username: username,
        sessionToken: result.sessionToken
    }
    setUserData(userData)
    return result
}
export async function logout() {
    const res = api.post('/logout', {})
    clearUserData()
    return res;
}
export async function createQuiz(quiz) {
    const body = setOwner(quiz)
    const result = await api.post('/classes/Quiz', body)
    return result
}
export async function getQuiz() {
    const result = await api.get('/classes/Quiz')
    return result
}
export async function getQuizById(id) {
    const result = await api.get('/classes/Quiz/' + id + '?include=owner')
    return result
}
export async function editQuiz(id, quiz) {
    const result = await api.put('/classes/Quiz/' + id, quiz)
    return result
}
export async function deleteQuiz(id) {
    const result = await api.del('/classes/Quiz/' + id)
    return result
}
export async function createQuestion(quizId,question) {
    const body = setOwner(question)
    body.quiz = setPointer('Quiz', quizId)
    const result = await api.post('/classes/Question', body)
    return result
}
export async function getQuestion(quizId) {
    const result = await api.get('/classes/Question?where=' + encodeURIComponent(JSON.stringify({quiz: setPointer('Quiz', quizId)})))
    return result.results
}
export async function editQuestion(id, question) {
    const result = await api.put('/classes/Question/' + id, question)
    return result
}
export async function deleteQuestion(id) {
    const result = await api.del('/classes/Question/' + id)
    return result
}
