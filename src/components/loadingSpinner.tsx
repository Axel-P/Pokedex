import { FunctionComponent } from "react"
import pokeball from '../pokeball.png'

const LoadingSpinner: FunctionComponent = () => <img
    className="rotate"
    src={pokeball}
    width="100"
    height="100"
/>

export default LoadingSpinner