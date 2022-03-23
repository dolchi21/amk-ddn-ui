import React from 'react'
import { connect } from 'react-redux'

const ms2p = (state: any) => {
    //@ts-ignore
    const items = Object.entries(state.data.processes || []).map(([key, value]) => ({ ...value, key })).sort((a: any, b: any) => {
        return a.key.localeCompare(b.key)
    })
    return { items }
}

const md2p = (dispatch: any) => ({

})

const ProgressColor: any = {
    'done': 'bg-success',
    'error': 'bg-danger',
    'running': 'bg-info'
}
const Progress = (process: any) => {
    const progress = (process.totalDocuments ? process.processedDocuments / process.totalDocuments : 1) * 100
    return (
        <div className="progress">
            <div className={`progress-bar ${ProgressColor[process.status]}`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
    )
}

const Process = (process: any) => {
    const key = `${process.client}:${process.entityId}`
    const date = new Date(process.updatedAt)
    return (
        <React.Fragment>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{key}</h5>
                <small>{date.toLocaleString()}</small>
            </div>
            <p className="mb-1">
                Generación de emails de <strong>Grupo{process.entityId}</strong>. Se generaron {process.emailsGenerated} emails.
            </p>
            <Progress {...process} />
            <small title={JSON.stringify(process)}>And some small print.</small>
        </React.Fragment>
    )
}

const List = (props: any) => {
    return (
        <ul className="list-group">
            {props.items.map((process: any) => {
                const key = `${process.client}:${process.entityId}`
                return (
                    <li key={key} className="list-group-item">
                        <Process {...process} />
                    </li>
                )
            })}
        </ul >
    )
}

export default connect(ms2p, md2p)(List)