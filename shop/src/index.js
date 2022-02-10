import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
// 이거 하나를 불러와 줘야한다. /같은 경로없이 불러오는건 라이브러리다.
// import { HashRouter } from 'react-router-dom'
// 이와같이해도된다. 이건 주소에 #기호가 붙는다. 똑같지만 차이는 라우팅을 안전하게 할 수 있게도와준다.
// #이붙는거는 서버로 전달하지않는다 #은 서버에서 설정이 필요할 수 있다.

// import { Provider } from './react-redux'
// 이거 .하나때문에 오려 휴우..다행이다.

// import { createStore } from 'redux';
// let store = createStore(()=>{ return [{id:0, name:'멋진신발', quan : 2}] })
// redux설정

// import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import { computeHeadingLevel } from '@testing-library/react';

// let store = createStore(()=>{ return [{id : 0, name : '멋진신발', quan : 2},
// {id : 1, name : '멋진신발2', quan : 3},
// {id : 2, name : '멋진신발3', quan : 5},
// ]  })


let alert초기값 = true
// 아래 alert초기값에 true바로 넣어서 만들어도 되긴함 state = true
function reducer2(state = alert초기값, 액션){
  if(액션.type==='닫기'){
    state = false
    return state
    // return false
  }else{
    return state
  }
  

}


let 초기값= [{id : 0, name : '멋진신발', quan : 2},
{id : 1, name : '멋진신발2', quan : 3},
{id : 2, name : '멋진신발3', quan : 5},
]

function reducer(state = 초기값, 액션){ //es6 신문법, 기본파라미터 문법 데이터 초기값을 그냥 넣는다.
  if(액션.type ==='항목추가'){

     //state안에 id : 액션.데이터 인게 있는지
    let found = state.findIndex((a)=>{ return a.id === 액션.데이터.id })//array안에서 원하는 데이터 찾아주는 함수, find도됨
    if(found >=0){

      let copy = [...state]
      copy[found].quan++
      return copy

    }else{
      let copy = [...state]
      copy.push(액션.데이터)
      return copy
    }

    
    // let 몇번째있니 = state.findIndex( (a)=>{ return a.id === 액션.데이터.id });
    
    // if ( 몇번째있니 >= 0 ){
    //   let copy = [...state];
    //   copy[몇번째있니].quan++
    //   return copy
    // } else {
    //   let copy = [...state];
    //   copy.push(액션.데이터)
    //   return copy
    // }
    

    // let copy = [...state]
    // copy.push(액션.데이터)
    // return copy

}else if(액션.type === '수량증가'){
    let copy = [...state]
    copy[액션.데이터].quan++
    return copy

  }else if(액션.type === '수량감소'){
    let copy = [...state]
    if(copy[액션.데이터].quan === 0){
      return copy
    }else{
      copy[액션.데이터].quan--
    }
    return copy
    
    // 음수면 그만빼게 조건 해놓기 그건 쉬움
  }else{
    return state
  }
  
}
let store = createStore(combineReducers({reducer,reducer2}))
// let store = createStore(reducer)
// 참고로 이것도 코드길면 export default로 빼서 만들어도댐 redux로 ㅇㅇ


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    {/* Provider로 감싸진애들은 props없이 state공유가능 */}
    </BrowserRouter>
    {/* 이렇게 감싸주면 설정은 끝이다. */}
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
