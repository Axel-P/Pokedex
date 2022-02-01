import { PureComponent, ReactNode } from "react"
import { Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { IStore } from "../../store/types"
import interfaceSelector, { activeListSelector } from '../../store/selectors/interface'
import PokemonCell from './pokemonCell'
import Pagination from './pagination'

const mapStateToProps = (store: IStore) => ({
    listData: activeListSelector(store),
    activePage: interfaceSelector(store)?.pagination.active || 0
})

class PokemonList extends PureComponent<ReturnType<typeof mapStateToProps>> {

    render(): ReactNode {
        return <div className="toplevel-container">
            <Container fluid>
                <Row>
                    {this.props.listData?.map(pokemon => <PokemonCell data={pokemon} key={pokemon.id} />)}
                </Row>
                <Pagination />
            </Container>
        </div>
    }
}

export default connect(mapStateToProps)(PokemonList)