import { createStore, applyMiddleware, compose } from 'redux'
import { rxHttpGet, rxHttpPost } from './actions'
import { createRxHttpActionTypes } from './utils'

import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { createRxHttpEpic } from './epics'

const POTATO = createRxHttpActionTypes('POTATO')

interface RootState { }

const rootReducer = (state: RootState = {}, action: any) => state

const rxHttpEpic = createRxHttpEpic(() => ({
    baseUrl: 'http://localhost:3030',
    mode: 'no-cors',
}))

const epicMiddleware = createEpicMiddleware(combineEpics(rxHttpEpic))

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            epicMiddleware,
        ),
    ),
);

const createButton = (name: string, cb: () => any) => {
    const node = document.createElement('button')
    node.innerHTML = name
    node.addEventListener('click', (event: Event) => {
        event.preventDefault()
        cb()
    })
    document.body.appendChild(node)
}

const getNode = createButton('GET', () => {
    store.dispatch(rxHttpGet('/', POTATO))
})

const postNode = createButton('POST', () => {
    alert('posttttttt')
})

const resultNode = document.createElement('pre')
resultNode.style.height = '400px'
resultNode.style.width = '500px'
resultNode.style.border = '1px solid #ccc'
document.body.appendChild(resultNode)

document.body.style.width = '500px'
document.body.style.margin = 'auto'