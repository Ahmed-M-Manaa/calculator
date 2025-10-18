import { type } from "@testing-library/user-event/dist/type"
import { ACTIONS } from "./App"
export default function DigitBUTTON({dispatch , digit}){
    return    (  <button onClick={()=> dispatch({ type : ACTIONS.ADD_DIGIT , payload : { digit } })}>{digit}
    </button>
    )
}