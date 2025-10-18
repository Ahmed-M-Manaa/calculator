import { useReducer } from "react";
import "./style.css"
import DigitBUTTON from "./DigitButton";
import OperationBUTTON from "./OperationBUTTON";
export const ACTIONS ={
  ADD_DIGIT:"add-digit",
  CHOOSE_OPERATION :"choose-operation",
  CLEAR:"clear",
  DELETE_DIGIT:"delete-digit",
  EVALUATE:"evaluate",
}


function reduser(state ,  { type, payload }){
  
  switch (type)
  {
  case ACTIONS.ADD_DIGIT:

   if (state.overwrite){
    return{
      ...state,
      currantOperand: payload.digit,
      overwrite:false,
    }
   }
    if (payload.digit === "." && state.currantOperand.includes(".")){
      return state
    }
    if (payload.digit === "0" && state.currantOperand === "0") {
      return state
    }
      return {
        ...state,
        currantOperand :`${state.currantOperand || ""}${payload.digit}`,
      }
      case ACTIONS.DELETE_DIGIT:
        {
        
          if (state.overwrite){
            return{
              ...state,
              currantOperand: null,
              overwrite:false,
            }
          }

          if(state.currantOperand == null)return state
            
          if (state.currantOperand.length ===1){
            return {
              currantOperand: null,
            }     
          }
          return{
            ...state,
            currantOperand : state.currantOperand.slice(0 , -1),
          }
        }


      case ACTIONS.CHOOSE_OPERATION :
        if(state.currantOperand == null && state.previousOperand == null) {
          return state
        }

        if (state.currantOperand == null){
          return{
            ...state,
            Operation: payload.Operation,
          }
        }

        if ( state.previousOperand == null){
          return{
            ...state,
            Operation: payload.Operation,
            previousOperand : state.currantOperand ,
            currantOperand : null

          }           
        }


        return{
          ...state,
          previousOperand : evaluation(state),
          Operation: payload.Operation,
          currantOperand: null
        }


        case ACTIONS.EVALUATE:
        if (state.currantOperand == null || state.previousOperand == null || state.Operation == null){
          return state
        }

        return{
          ...state,
         currantOperand: evaluation(state),
         previousOperand: null,
         Operation: null,
         overwrite : true,

        }

      case ACTIONS.CLEAR:
          return {}
      }

      

      function evaluation({currantOperand ,previousOperand , Operation}){
        const prev = parseFloat(previousOperand) 
        const curt = parseFloat(currantOperand) 

        if(isNaN(prev) || isNaN(curt)) return ""
        let computaion =""

        switch (Operation)
        {
          case"*":
          computaion = prev * curt
          break
          case"/":
          computaion = prev / curt
          break
           case"+":
          computaion = prev + curt
          break
          case"-":
          computaion = prev - curt
          break
        }
        return computaion.toString()

      }
}



function App() {
  const [ {currantOperand ,previousOperand , Operation } ,dispatch ] = useReducer(reduser ,{})

  return (
   <div className="calculator-grid">
     <div className="out-put">
       <div className="previous-operand">
{previousOperand} { Operation}       </div>
       <div className="currant-operand">
{currantOperand}       </div>
     </div> 

     <button className="span-tow" onClick={()=> dispatch({type : ACTIONS.CLEAR })}>AC</button>
     <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})} >DEL</button>

     <OperationBUTTON Operation= "/" dispatch={dispatch}/>
     <DigitBUTTON digit= "1" dispatch={dispatch}/>
     <DigitBUTTON digit= "2" dispatch={dispatch}/>
     <DigitBUTTON digit= "3" dispatch={dispatch}/>
     <OperationBUTTON Operation= "*" dispatch={dispatch}/>
     <DigitBUTTON digit= "4" dispatch={dispatch}/>
     <DigitBUTTON digit= "5" dispatch={dispatch}/>
     <DigitBUTTON digit= "6" dispatch={dispatch}/>
    
     <OperationBUTTON Operation= "+" dispatch={dispatch}/>
     <DigitBUTTON digit= "7" dispatch={dispatch}/>
     <DigitBUTTON digit= "8" dispatch={dispatch}/>
     <DigitBUTTON digit= "9" dispatch={dispatch}/>
     <OperationBUTTON Operation= "-" dispatch={dispatch}/>
     <DigitBUTTON digit= "0" dispatch={dispatch}/>
     <DigitBUTTON digit= "." dispatch={dispatch}/>

     <button className="span-tow" onClick={()=> dispatch({type :ACTIONS.EVALUATE})}>=</button>



   </div> //calculator-grid

  );
}

export default App;
