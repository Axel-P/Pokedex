import { PureComponent, ReactNode } from "react"
import { Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { IStore } from "../../store/types"
import interfaceSelector, { activeListSelector } from '../../store/selectors/interface'
import PokemonCell from './pokemonCell'

const mapStateToProps = (store: IStore) => ({
    listData: activeListSelector(store),
    activeRecord: interfaceSelector(store)?.spotlight.activeRecordIndex
})

class PokemonList extends PureComponent<ReturnType<typeof mapStateToProps>> {

    render(): ReactNode {
        return <Container fluid className="p-0">
            <Row>
                {this.props.listData?.map(pokemon =>
                    <PokemonCell data={pokemon} key={pokemon.id} active={this.props.activeRecord === pokemon.id - 1} />
                )}
            </Row>
        </Container>
    }
}

export default connect(mapStateToProps)(PokemonList)