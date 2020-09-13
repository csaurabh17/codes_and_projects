import React from 'react';
import Header from './components/shared/Header'
import {
  BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import  { initStore } from './store'
import Provider from './store/Provider'
// const renderPages = () => {
//   const url = window.location.pathname;
//   switch (url){
//     case '/' :
//       return <GalleryHome />
//     case '/login' :
//        return <Login />
//     case '/register' :
//       return <Register />
//       default :
//       return <Error />

//   }
// }

const store = initStore();
function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes />
        </Router>
      </Provider>
    </div>
  )
}

export default App;
