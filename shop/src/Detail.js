import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useHistory,useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button,Navbar,Container,Nav,NavDropdown,Carousel } from 'react-bootstrap';
import {CSSTransition} from "react-transition-group"
import styled from 'styled-components'
import './Detail.scss'
import { connect } from 'react-redux';



function Detail(props){

  let [alert,alert변경] = useState('my-alert3')
  let [alert2,alert2변경] = useState(true)
  let [inputData,inputData변경] = useState('')
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치,스위치변경] = useState(false)
  // let [최근,최근변경] = useState([])

  let 박스 = styled.div`
  padding:20px;
`
let 제목 = styled.h4`
  font-size:25px;
  color:${props=>props.색상}
`


  useEffect(()=>{
    let timer = setTimeout(()=>{
      console.log('hi')
      alert변경('my-alert')
    },2000)
    return ()=>{ clearTimeout(timer)}
  },[alert])

  useEffect(()=>{
    let timer2 = setTimeout(()=>{
      alert2변경(false)
    },2000)
    return ()=>{ clearTimeout(timer2)}
  },[alert2])

  let{ id } = useParams();
  let history = useHistory();
  let 찾은상품 = props.shoes.find(function(상품){
    return 상품.id==id
  })

  // useEffect(()=>{
  //   // localStorage.setItem(JSON.stringify({name:'kim'}))
  //   let a = localStorage.getItem('방문한페이지')
  //   let b = JSON.parse(a)
  //   b.push(id)
  //   localStorage.setItem('방문한페이지', JSON.stringify({b}) );
  //   return ()=>{ }
  // })

  useEffect(()=>{
    let arr = localStorage.getItem('watched')
    // 아니면 처음부터 arr[] 무조건 있게 만들어주면됨 watched어레이 ㅋㅋ
    if( arr == null){ arr = [] } else{arr = JSON.parse(arr)}
    
    arr.push(id)
    arr = new Set(arr) //set은 중복자료제거
    arr = [...arr] //다시 괄호를 벗겨서 array로 변경

    localStorage.setItem('watched',JSON.stringify(arr))

  },[])
  return(
    <div className="container">
      <박스>
      <제목 className="red">상세페이지</제목>

      </박스>
      {inputData}
      <input onChange = {(e)=>{ inputData변경(e.target.value) }}/>
 
      <div className={alert}>
        <p>재고가 얼마 남지 않았어요</p>
      </div>

      {
        alert2 === true
        ?(<div className={alert}>
          <p>재고가 얼마 남지 않았어요2</p>
        </div>)
        :null
      }

      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes"+(찾은상품.id+1)+".jpg"} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
        <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>

         <Info 재고 = {props.재고[id]}></Info>
         <button className="btn btn-danger" onClick={()=>{
           
          history.push('/cart')
           }}>테스트하기</button> 

          <button className="btn btn-danger" onClick={()=>{
            var newArray = [...props.재고]
            newArray[id] = newArray[id]-1
            props.재고변경(newArray)

            // history.push('/cart')
            // payload -> 데이터로 이름바꿈
            props.dispatch({type:'항목추가', 데이터 : {id:찾은상품.id, name:찾은상품.title, quan : 1}})
            history.push('/cart')//페이지이동 강제로하기, 개발환경에서

          }}>주문하기</button> 
          <button className="btn btn-danger" onClick={()=>{
            history.push('/')
           }}>뒤로가기</button> 
        </div>
      </div>

      <Nav variant="tabs" className="mt-5" defaultActiveKey="link-0">
  <Nav.Item>
    <Nav.Link eventKey="link-0" onClick = {()=>{ 스위치변경(false);누른탭변경(0)} }>Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1" onClick = {()=>{ 스위치변경(false);누른탭변경(1)} }>Option 2</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2" onClick = {()=>{ 스위치변경(false);누른탭변경(2)} }>Option 3</Nav.Link>
  </Nav.Item>
</Nav>

<CSSTransition in={스위치} classNames="wow" timeout={500}>
<TabContent 누른탭 = {누른탭} 스위치변경 = {스위치변경}></TabContent>
</CSSTransition>

</div>         
  )
}

function TabContent(props){

  useEffect(()=>{
    props.스위치변경(true)
  })

  if(props.누른탭 === 0){
    return <div>0번째</div>
  } else if(props.누른탭 === 1){
    return <div>1번째</div>
  }else if(props.누른탭 === 2){
    return <div>2번째</div>
  }
}

function Info(props){
  return(
    <p>재고 : {props.재고}</p>
  )
}

function state를props화(state){
  console.log(state)
  return {
    상품명 : state.reducer[0].name,
    state:state.reducer,
    alert열렸니:state.reducer2
  }
}

export default connect(state를props화)(Detail)

// export default Detail;
