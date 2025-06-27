import {useReducer} from 'react'
import Digitbutton from './digit'
import Operationbutton from './operation'
import "./styles.css"

export const ACTIONS = {
  ADD : 'add',
  CLEAR : 'clear',
  DEL : 'del',
  CHOOSE : 'choose',
  EVAL : 'eval'
}
function reducer(state,{type,payload}){
  switch(type) {
    case ACTIONS.ADD:
      if(state.overwrite){
        return {
          ...state,
          cur_op : payload.digit,
          overwrite : false,
        }
      }
      if(payload.digit == "0" && state.cur_op == "0") return state
      if(payload.digit == "." && state.cur_op.includes(".")) return state

      return{
        ...state,
        cur_op: `${state.cur_op || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DEL:
      if(state.overwrite) return{
        ...state,
        cur_op : null,
        overwrite : false,
      }
      if(state.cur_op == null) return state
      if(state.cur_op.length == 1) return {
        ...state,
        cur_op : null,
      }

      return{
        ...state,
        cur_op : state.cur_op.slice(0,-1),
      }

    case ACTIONS.CHOOSE:
      if(state.cur_op == null && state.prev_op == null) return state
      if(state.prev_op == null) {
        return{
          ...state,
          op:payload.operation,
          prev_op : state.cur_op,
          cur_op : null,
        }
      }

      if(state.cur_op == null){
        return{
          ...state,
          op : payload.operation,
        }
      }

      return {
        ...state,
        prev_op : evaluate(state),
        cur_op : null,
        op : payload.operation,
      }

    case ACTIONS.EVAL:
      if (state.op == null || state.cur_op == null || state.prev_op == null) return state
      return{
        ...state,
        overwrite : true,
        prev_op : null,
        cur_op : evaluate(state),
        op : null,
      }
  }
}


function evaluate({cur_op,prev_op,op}){
  const prev = parseFloat(prev_op)
  const cur = parseFloat(cur_op)

  if(isNaN(prev) || isNaN(cur)) return ""
  let comp = ""
  switch(op){
    case "+":
      comp = prev+cur
      break
    case "-":
      comp = prev-cur
      break
    case "*":
      comp = prev*cur
      break
    case "/":
      comp = prev/cur
      break
  }

 return comp.toString()
}

function format(op){
  if(op == null) return 
  const [integer,decimal] = op.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0,
})
function App(){
  const[{cur_op,prev_op,op},dispatch] = useReducer(reducer,{})

      return(
        <div className = "Calculator">
          <div className = "output" >
            <div className = " previous-operand">{format(prev_op)}{op}</div>
            <div className = " current-operand">{format(cur_op)}</div>
          </div>
          <button className = "span-two" onClick={() => dispatch({type:ACTIONS.CLEAR})}>AC</button>
          <button onClick = {() => dispatch({type:ACTIONS.DEL})}>DEL</button>
          <Operationbutton operation = "/" dispatch={dispatch} />
          <Digitbutton digit = "1" dispatch={dispatch} />
          <Digitbutton digit = "2" dispatch={dispatch} />
          <Digitbutton digit = "3" dispatch={dispatch} />
          <Operationbutton operation = "*" dispatch={dispatch} />
          <Digitbutton digit = "4" dispatch={dispatch} />
          <Digitbutton digit = "5" dispatch={dispatch} />
          <Digitbutton digit = "6" dispatch={dispatch} />
          <Operationbutton operation= "+" dispatch={dispatch} />
         <Digitbutton digit = "7" dispatch={dispatch} />
          <Digitbutton digit = "8" dispatch={dispatch} />
          <Digitbutton digit = "9" dispatch={dispatch} />
          <Operationbutton operation = "-" dispatch={dispatch} />
        <Digitbutton digit = "." dispatch={dispatch} />
          <Digitbutton digit = "0" dispatch={dispatch} />
          <button className = "span-two" onClick={() => dispatch({type:ACTIONS.EVAL})}>=</button>

        </div>
      )
}

export default App