import { PureComponent, ReactNode } from "react";
import { Col } from "react-bootstrap";
import { IPokemon } from "../../store/types";

export default class PokemonCell extends PureComponent<{ data: IPokemon }>{

    render(): ReactNode {
        return <Col lg={12} className="cell">{this.props.data.name}</Col>
    }
}