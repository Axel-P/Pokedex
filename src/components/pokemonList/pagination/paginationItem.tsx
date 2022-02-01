import React, { PureComponent } from 'react'
import { Pagination } from 'react-bootstrap'

class PaginationItem extends PureComponent<{
    value: number,
    active?: boolean,
    onClick: (value: number) => void
}> {

    onClickHandler = () => {
        this.props.onClick(this.props.value)
    }

    render(): React.ReactNode {
        return <Pagination.Item active={this.props.active} onClick={this.onClickHandler}>
            {this.props.children}
        </Pagination.Item>
    }
}

export default PaginationItem