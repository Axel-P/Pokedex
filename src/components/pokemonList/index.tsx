import { PureComponent, ReactNode } from "react"
import { Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { IStore } from "../../store/types"
import interfaceSelector, { activeListSelector } from '../../store/selectors/interface'
import PokemonCell from './pokemonCell'
import LoadingSpinner from "../loadingSpinner"

const mapStateToProps = (store: IStore) => ({
    listData: activeListSelector(store),
    activeRecord: interfaceSelector(store)?.spotlight.activeRecord,
    isLoading: interfaceSelector(store)?.pagination.loading
})

class PokemonList extends PureComponent<ReturnType<typeof mapStateToProps>> {

    render(): ReactNode {
        return <Container fluid className="p-0 data-list-container">
            <Row style={{ position: 'relative' }}>
                {this.props.listData?.map(pokemon =>
                    <PokemonCell data={pokemon} key={pokemon.id} active={this.props.activeRecord?.id === pokemon.id} />
                )}
                {this.props.isLoading && <div className="loadingOverlay">
                    <LoadingSpinner />
                </div>}
            </Row>
        </Container>
    }
}

export default connect(mapStateToProps)(PokemonList)