import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { actionsGenerators } from '../store/actions/actionCreators'

const mapActionsToProps = {
  requestData: actionsGenerators.requestData
}
class RequestPokemonsButton extends PureComponent<typeof mapActionsToProps>{
    render(): React.ReactNode {
        return <Button variant="primary" onClick={this.props.requestData}>Fetch pokemons</Button>
    }
}

export default connect(undefined, mapActionsToProps)(RequestPokemonsButton)