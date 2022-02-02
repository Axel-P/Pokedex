import { PureComponent, ReactNode } from "react";
import { Col } from "react-bootstrap";
import { IPokemon } from "../../store/types";
import { actionsGenerators } from '../../store/actions/interfaceActionCreators'
import { connect } from "react-redux";

const mapActionsToProps = {
    requestSpotlight: actionsGenerators.spotlight.requestSpotlight
}

interface IDownstreamProps {
    data: IPokemon,
    active?: boolean
}

class PokemonCell extends PureComponent<IDownstreamProps & typeof mapActionsToProps>{

    requestSpotlight = () => {
        if (!this.props.active) {
            this.props.requestSpotlight(this.props.data.name)
        } else {
            this.props.requestSpotlight(undefined)
        }
    }

    render(): ReactNode {
        return <Col lg={12} className="cell">
            <div className={`content ${this.props.active ? 'active' : ''}`} onClick={this.requestSpotlight}>
                {this.props.data.name}
            </div>
        </Col>
    }
}

export default connect(undefined, mapActionsToProps)(PokemonCell)