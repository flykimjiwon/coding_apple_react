/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import Data from './data.js'
// import Detail from './Detail.js'
let Detail = lazy(()=>import( './Detail.js'))
// Detail을 보여줄때만 import해온다.
import axios from 'axios'
import Test from './test'
import Cart from './Cart.js'

import { Button,Navbar,Container,Nav,NavDropdown,Carousel } from 'react-bootstrap';
import React,{useContext, useState,lazy,Suspense} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

let 재고context = React.createContext()

function App() {

  let [shoes,shoes변경] = useState(Data)
  let [재고,재고변경] = useState([10,11,12])

  return (
    
    <div className="App">
  
  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="#home">SHOP</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as = {Link} to="/">Home</Nav.Link>
      <Nav.Link as = {Link} to="/detail">Detail</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>


<Switch>

<Route exact path="/">
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://cdn.wallpapersafari.com/24/37/K4wNkq.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://tdinteriorsinc.com/wp-content/uploads/2013/03/landscape-7-800x400.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wakeupwithzest.com/wp-content/uploads/2018/04/website-images-800-x-400-px-2.png"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<div className="container">

  <재고context.Provider  value = {재고}>
  <div className="row">          
      {
        shoes.map((a,i)=>{
          return <Card shoes={shoes[i]} i={i} key={i}></Card>
        })
      }

      

  </div>
  </재고context.Provider>
  
  <button className='btn btn-primary' onClick={()=>{

    axios.post('서버URL',{id:'flykimjiwon',pw:123456})

    axios.get('https://codingapple1.github.io/shop/data2.json')
    .then((result)=>{//성공하면실행

      console.log(result.data)
      console.log('성공')
      shoes변경([...shoes,...result.data]) 
    })
    .catch(()=>{ //실패하면실행
      
      console.log('실패')
    })

  }}>더보기</button>


</div>
</Route>


<Route path="/detail/:id">
  <Suspense fallback={<div>로딩중이에요</div>}>
  <Detail shoes={shoes} 재고 = {재고} 재고변경={재고변경}></Detail>

  </Suspense>

</Route>

<Route path="/cart">
  <Cart></Cart>
</Route>
{/* 이거 아래랑 순서바뀌면 아래거가보임 아무거나 페이지가보임 */}

<Route path="/test">
  <Test></Test>
</Route>

<Route path="/:id"> 
      <div>아무거나 적었을때 보여주는 페이지</div>
</Route>



</Switch>




   
  

    </div>
  );
}



function Card(props){

  let 재고 = useContext(재고context)
  let history = useHistory();

  return(
    <>
    <div className="col-md-4" onClick={()=>{ history.push('/detail/'+props.shoes.id)}}> 
    <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="100%"></img>
     <h4>{props.shoes.title}</h4>
    <p>{props.shoes.content} & {props.shoes.price}</p></div>

    </>
  )
}

export default App;
