import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { actionsGenerators } from '../../store/actions/interfaceActionCreators'
import interfaceSelector from '../../store/selectors/interface'
import { IStore } from '../../store/types'
import Footer from './linkedData'

const mapStateToProps = (store: IStore) => ({
    activeRecord: interfaceSelector(store)?.spotlight.activeRecord
})

const mapActionsToProps = (dispatch: Dispatch) => ({
    clearSpotlight: () => {
        dispatch(actionsGenerators.spotlight.requestSpotlight(undefined))
    }
})

const Spotlight: FunctionComponent<
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapActionsToProps>
> = ({ activeRecord, clearSpotlight }) => {

    return <div className='spotlight'>
        <div className='header'>
            <div className='close' onClick={clearSpotlight}>X</div>
            <div className='title'>{activeRecord?.name}</div>
        </div>
        <div className='content'>
            <div className='lhs'>
                <img src={activeRecord?.sprites.front_default} />
            </div>
            <div className='rhs'>
                <div className='title'>types:</div>
                <div className='types-content'>{activeRecord?.types.map(({ type }) => type.name).join(', ')}</div>
            </div>
        </div>
        <Footer evolutionTree={activeRecord?.evolutionTree} />
    </div>
}

export default connect(mapStateToProps, mapActionsToProps)(Spotlight)