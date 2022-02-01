import { PureComponent, ReactNode } from "react"
import { Col, Container, Row } from "react-bootstrap"
import PokemonList from "./pokemonList"
import Spotlight from "./spotlight"
import Pagination from './pagination'
import { connect } from "react-redux"
import { IStore } from "../store/types"
import interfaceSelector from '../store/selectors/interface'

const mapStateToProps = (store: IStore) => ({
    hasActiveRecord: interfaceSelector(store)?.spotlight.activeRecordIndex !== undefined
})

class DataDisplay extends PureComponent<ReturnType<typeof mapStateToProps>> {

    render(): ReactNode {
        return <div className="toplevel-container">
            <Container fluid>
                <Row>
                    <Col lg={this.props.hasActiveRecord ? 8 : 12}>
                        <PokemonList />
                    </Col>
                    {this.props.hasActiveRecord ? <Col lg={4}>
                        <Spotlight />
                    </Col> : <></>}
                </Row>
                <Pagination />
            </Container>
        </div>
    }
}

export default connect(mapStateToProps)(DataDisplay)