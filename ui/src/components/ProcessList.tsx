import React from 'react'
import { connect } from 'react-redux'
import { enqueue } from '../actions'

const ms2p = (state: any) => {
    const items = (state.data.processes || []).sort((a: any, b: any) => a.order.localeCompare(b.order))
    return { items }
}

const md2p = (dispatch: any) => ({ dispatch })

const ProgressColor: any = {
    done: 'bg-success',
    error: 'bg-danger',
    running: 'bg-info progress-bar-striped progress-bar-animated'
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
                <ProcessTitle {...process} />
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

const ProcessTitleBreadcrumb = (process: any) => (
    <ol className="mb-1 breadcrumb">
        <li className="breadcrumb-item">{process.client}</li>
        <li className="breadcrumb-item">{process?.clientData?.name}</li>
    </ol>
)
const ProcessTitle = connect(null, md2p)((process: any) => (
    <h5 className="mb-1" style={{ cursor: 'pointer' }} onClick={() => {
        const action = enqueue(process.client, process.entityId)
        action(process.dispatch)
    }}>
        <span className="badge bg-dark">{process.client}</span>
        <small className="ms-2 u-clientName">{process?.clientData?.name}</small>
    </h5>
))

const ListItemClass: any = {
    //done: 'list-group-item-success',
    error: 'list-group-item-danger'
}
const List = (props: any) => {
    return (
        <ul className="list-group">
            {props.items.map((process: any) => {
                return (
                    <li key={process.key} className={`list-group-item ${ListItemClass[process.status]}`}>
                        <Process {...process} />
                    </li>
                )
            })}
        </ul >
    )
}

export default connect(ms2p, md2p)(List)