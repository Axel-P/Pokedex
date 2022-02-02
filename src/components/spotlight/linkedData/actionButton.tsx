import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { actionsGenerators } from "../../../store/actions/interfaceActionCreators"

const mapActionsToProps = {
    requestSpotlight: actionsGenerators.spotlight.requestSpotlight
}

const ActionButton: FunctionComponent<{
    value: string,
    className: string
} & typeof mapActionsToProps> = ({ value, className, requestSpotlight }) => {

    return <div className={className} onClick={() => { requestSpotlight(value) }}>{value}</div>
}

export default connect(undefined, mapActionsToProps)(ActionButton)