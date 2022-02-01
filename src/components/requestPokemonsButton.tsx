import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { actionsGenerators } from '../store/actions/dataActionCreators'

const mapActionsToProps = (dispatch: Dispatch) => ({
    requestData: () => {
        dispatch(actionsGenerators.requestData())
    }
})
class RequestPokemonsButton extends PureComponent<ReturnType<typeof mapActionsToProps>>{
    render(): React.ReactNode {
        return <Button variant="primary" onClick={this.props.requestData}>Fetch pokemons</Button>
    }
}

export default connect(undefined, mapActionsToProps)(RequestPokemonsButton)