import { PureComponent, ReactNode } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { connect } from "react-redux"
import { IStore } from "../../store/types"
import listDataSelector from '../../store/selectors/allData'
import PokemonCell from './pokemonCell'

const mapStateToProps = (store: IStore) => ({
    listData: listDataSelector(store)
})

class PokemonList extends PureComponent<ReturnType<typeof mapStateToProps>> {

    render(): ReactNode {
        return <div className="toplevel-container">
            <Container fluid>
                <Row>
                    {this.props.listData?.map(pokemon => <PokemonCell data={pokemon} key={pokemon.id} />)}
                </Row>
            </Container>
        </div>
    }
}

export default connect(mapStateToProps)(PokemonList)