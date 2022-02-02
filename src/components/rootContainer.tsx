import { FunctionComponent, useEffect } from "react"
import { connect } from "react-redux"
import { actionsGenerators } from "../store/actions/dataActionCreators"
import DataDisplay from './dataDisplay'

const mapActionsToProps = {
  requestData: actionsGenerators.listData.requestData
}

const RootContainer: FunctionComponent<typeof mapActionsToProps> = ({ requestData }) => {

  useEffect(() => {
    requestData()
  }, [])

  return <div className="App">
    <DataDisplay />
  </div>
}

export default connect(undefined, mapActionsToProps)(RootContainer)