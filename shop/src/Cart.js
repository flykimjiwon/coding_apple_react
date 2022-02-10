import React from 'react'
import {Table} from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import './Detail.scss'

function Cart(props){
  var style = {color:'blue'}

  let state = useSelector((state)=>state) // redux에있던 모든 state임 => 리턴
  console.log(state)
  console.log(state.reducer)

  // let state = useSelector((state)=>state.reducer) // redux에있던 모든 state임 => 리턴
  // console.log(state)

  let dispatch = useDispatch()
  function 버튼닫기(props){
    dispatch( {type:"닫기"})
  }

  return(
    
      <div>
  <Table responsive="sm">
    <thead>
      <tr style={style}>
        <th>#</th>
        <th>상품명</th>
        <th>수량</th>
        <th>변경</th>

      </tr>
    </thead>
    <tbody>{
      // props.state.map((a,i)=>{
        state.reducer.map((a,i)=>{
        return(
          <tr key = {i}>
        <td>{ a.id }</td>
        <td>{ a.name }</td>
        <td>{ a.quan }</td>
        <td>
        {/* <button onClick={()=>{ props.dispatch( {type: '수량증가', 데이터 : a.id} ) }}> + </button>  */}
        <button onClick={()=>{ dispatch( {type:"수량증가", 데이터 : a.id}) }}>+</button>
        <button onClick={()=>{ dispatch( {type:"수량감소", 데이터 : a.id}) }}>-</button>
        {/* <button onClick={()=>{ props.dispatch( {type:"수량증가"}) }}>+</button>
        <button onClick={()=>{ props.dispatch( {type:"수량감소"}) }}>-</button> */}
        </td>

      </tr>
        )
      })
      }          
    </tbody>
  </Table>
          {/* props.state.map((a,i)=>{
        state.reducer.map((a,i)=>{ */}

  {
    state.reducer2 ===true
    // props.alert열렸니 ===true
    ?(<div className="my-alert3">
    <p>지금 구매하세용 할인중!! 20%!!</p>
    {/* <button onClick={()=>{ props.dispatch( {type:"닫기"})}}>닫기</button> */}
    {/* <button onClick={()=>{dispatch( {type:"닫기"})}}>닫기</button> */}
    <button onClick={버튼닫기}>닫기</button>


    {/* 이런건 버튼기능 선언해서쓰기 함수로!! */}
    

   </div>)
    :null
  }

</div>

    

  )
}

// store에있던 데이터를 가져와서 props로 변환해주는 함수
// 즉 return에 있는애들이 props 라고 볼 수 있음

// function state를props화(state){
//   console.log(state)
//   return {
//     상품명 : state.reducer[0].name,
//     state:state.reducer,
//     alert열렸니:state.reducer2
//   }
// }

// export default connect(state를props화)(Cart)

export default Cart;