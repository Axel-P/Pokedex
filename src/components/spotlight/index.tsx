import React, { FunctionComponent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { actionsGenerators } from '../../store/actions/interfaceActionCreators'
import { getRecordByIDSelector } from '../../store/selectors/allData'
import interfaceSelector from '../../store/selectors/interface'
import { IPokemon, IStore } from '../../store/types'

const mapStateToProps = (store: IStore) => ({
    getRecordByID: getRecordByIDSelector(store),
    activeRecord: interfaceSelector(store)?.spotlight.activeRecordIndex
})

const mapActionsToProps = (dispatch: Dispatch) => ({
    clearSpotlight: () => {
        dispatch(actionsGenerators.spotlight.requestSpotlight(undefined))
    }
})

const Spotlight: FunctionComponent<
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapActionsToProps>
> = ({ getRecordByID, activeRecord, clearSpotlight }) => {
    const [displayData, setDisplayData] = useState<IPokemon | undefined>(undefined)

    useEffect(() => {
        if (activeRecord !== undefined) {
            const toDisplay = getRecordByID(activeRecord + 1)
            if (toDisplay) {
                setDisplayData(toDisplay)
            }
        }
    }, [activeRecord, getRecordByID])

    return <div className='spotlight'>
        <div className='header'>
            <div className='close' onClick={clearSpotlight}>X</div>
            <div className='title'>{displayData?.name}</div>
        </div>
        <div className='content'>
            <div className='lhs'>
                <img src={displayData?.sprites.front_default} />
            </div>
            <div className='rhs'>
                <div className='title'>types:</div>
                <div className='types-content'>{displayData?.types.map(({ type }) => type.name).join(', ')}</div>
            </div>
        </div>
        <div className='footer'></div>
    </div>
}

export default connect(mapStateToProps, mapActionsToProps)(Spotlight)