import React, { PureComponent } from 'react'
import { Row, Col, Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { IStore } from '../../../store/types'
import interfaceSelector from '../../../store/selectors/interface'
import PaginationItem from './paginationItem'
import { actionsGenerators } from '../../../store/actions/interfaceActionCreators'

const mapActionsToProps = {
    requestActivePage: actionsGenerators.activePage.requestActivePage
}

const mapStateToProps = (store: IStore) => ({
    activePage: interfaceSelector(store)?.pagination.active || 0
})

const items: number[] = []
const numberOfPages = Number(process.env.REACT_APP_MAX_RECORD_COUNT) / Number(process.env.REACT_APP_PAGE_SIZE)
console.log({ numberOfPages })
for (let i = 0; i < numberOfPages; i++) {
    items.push(i)
}

class PaginationControl extends PureComponent<ReturnType<typeof mapStateToProps> & typeof mapActionsToProps> {

    render(): React.ReactNode {
        return <Row className="justify-content-md-end">
            <Col md="auto">
                <Pagination>
                    {items.map(item => {
                        return <PaginationItem value={item} onClick={this.props.requestActivePage} active={item === this.props.activePage} key={item}>
                            {item + 1}
                        </PaginationItem>
                    })}
                </Pagination>
            </Col>
        </Row>
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PaginationControl)