import { FunctionComponent } from "react"
import { IPokemon } from "../../../store/types"
import ActionButton from './actionButton'

const LinkedData: FunctionComponent<{
    evolutionTree: IPokemon['evolutionTree']
}> = ({ evolutionTree }) => {

    return evolutionTree ? <div className='footer'>
        {evolutionTree.previousStageName ? <ActionButton className="previous-stage" value={evolutionTree.previousStageName} /> : <></>}
        {evolutionTree.nextStageName ? <ActionButton className="next-stage" value={evolutionTree.nextStageName} /> : <></>}
    </div> : <></>
}

export default LinkedData