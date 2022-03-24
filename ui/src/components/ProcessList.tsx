import React from 'react'
import { connect } from 'react-redux'

const STATUS_ORDER: any = {
    running: 0,
    error: 8,
    done: 9
}

const ms2p = (state: any) => {
    const items = Object.entries(state.data.processes || []).map(([key, value]: any) => {
        const date = new Date(value.updatedAt)
        return {
            ...value,
            key,
            //order: (Date.now() - date.valueOf()).toString()
            order: `${STATUS_ORDER[value.status]}/${key}`
            //order: key
        }
    }).sort((a: any, b: any) => a.order.localeCompare(b.order))
    return { items }
}

const md2p = (dispatch: any) => ({

})

const ProgressColor: any = {
    done: 'bg-success',
    error: 'bg-danger',
    running: 'bg-info'
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
                Generación de emails de {process?.clientData?.name} <strong>Grupo{process.entityId}</strong>.
            </p>
            <Progress {...process} />
            {process.error && <small>Error: {process.error}.</small>}
            {!process.error && <small title={JSON.stringify(process)}>Se generaron {process.emailsGenerated} emails.</small>}
        </React.Fragment>
    )
}

const List = (props: any) => {
    return (
        <ul className="list-group">
            {props.items.map((process: any) => {
                return (
                    <li key={process.key} className="list-group-item">
                        <Process {...process} />
                    </li>
                )
            })}
        </ul >
    )
}

export default connect(ms2p, md2p)(List)