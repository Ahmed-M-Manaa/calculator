import { type } from "@testing-library/user-event/dist/type"
import { ACTIONS } from "./App"
export default function OperationBUTTON({dispatch , Operation}){
    return    (  <button onClick={()=> dispatch({ type : ACTIONS.CHOOSE_OPERATION , payload : { Operation } })}>{Operation}
    </button>
    )
}