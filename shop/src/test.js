import React from 'react'
import {Table} from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import './Detail.scss'
function Test(props){

  return(
    <div>
      <h1>TEST페이지</h1>
      <Component></Component>
      <Component2></Component2>
      {
        1 === 1
        ? <p>참일때 삼항연산자</p>
        : null
      }
      {
        1 === 2
        ? <p>참일때 삼항연산자 중첩</p>
        : (2 === 2
          ? <p>안녕</p>
          : <p>반가웡</p>
        )
      }
      <Component3></Component3>
      <Component5></Component5>
      <Component6></Component6>
      

    </div>
  )
}

function Component(){
  if (true){
    return <p>참일때</p>
  }else{
    return null;
  }
}

function Component2(){
  if (true){
    return <p>참일때2</p>
  }
    return null;
  
}

function Component3() {
  return (
    <div>
      {
        1 === 1 && <p>참이면 보여줄 HTML</p>
      }
    </div>
  )
}

function Component5(){
  var 현재상태 = 'info'
  return(
    <div>
      {
        { 
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }
    </div>
  )
}

var 탭UI = { 
  info : <p>상품정보</p>,
  shipping : <p>배송관련</p>,
  refund : <p>환불약관</p>
}

function Component6() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        탭UI[현재상태]
      }
    </div>
  )
} 



export default Test;