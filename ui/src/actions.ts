import * as Data from './modules/Data'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const loadProcesses = async (dispatch: any) => {
    const res = await fetch('http://icharlie.amtek.com.ar:3000/state')
    const processes = await res.json()
    dispatch(Data.set({ processes, updatedAt: new Date() }))
}

export const autoLoadProcesses = async (dispatch: any, getState: any) => {
    console.log('autoLoad')
    const state = getState()
    if (state.data.auto) return
    dispatch(Data.set({ auto: true }))
    while (true) {
        const state = getState()
        if (state.data.auto) await loadProcesses(dispatch)
        await sleep(1000 * 1)
    }
}