import * as Data from './modules/Data'

export const loadProcesses = async (dispatch: any) => {
    const res = await fetch('http://icharlie.amtek.com.ar:3000/state')
    const processes = await res.json()
    dispatch(Data.set({ processes }))
}

export const autoLoadProcesses = async (dispatch: any, getState: any) => {
    console.log('autoLoad')
    const state = getState()
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    if (state.data.auto) return
    dispatch(Data.set({ auto: true }))
    setTimeout(async () => {
        while (true) {
            const state = getState()
            if (!state.data.auto) return
            await loadProcesses(dispatch)
            await sleep(1000 * 1)
        }
    })
}