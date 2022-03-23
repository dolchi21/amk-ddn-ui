import React from 'react'
import { Provider } from 'react-redux'
import * as A from './actions'
import './App.css'
import ProcessList from './components/ProcessList'
import { makeStore } from './makeStore'

function App() {
    return (
        <div className="container">
            <ProcessList />
        </div>
    )
}

const CApp = (props: any) => {
    const store = makeStore()
    //A.loadProcesses(store.dispatch)
    setTimeout(() => A.autoLoadProcesses(store.dispatch, store.getState))
    return (
        <Provider store={store}>
            <App {...props} />
        </Provider>
    )
}

export default CApp