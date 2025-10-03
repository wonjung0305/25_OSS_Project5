import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Updated';
import './App.css';
import { Icon } from 'semantic-ui-react';

function App() {

  const HomeIconComponent = () => {
    const location = useLocation(); // 현재 경로를 가져옴

    // create와 update 페이지에서 홈 버튼 숨겨야 함
    const pagesToHide = ['/', '/update'];

    // 숨기는 페이지 중 하나인지 확인
    const checkHide = pagesToHide.includes(location.pathname);

    const homeImg = (
    <Link to="/" style={{ color: 'whitesmoke', textDecoration: 'none'}}>
      <Icon name='home' size='large' style={{ cursor: 'pointer', margin: '0 0.5rem'}}/>
    </Link>
  );

  // 안보이게 해야 되는 페이지 중 하나라면
    if(checkHide){
      return <div style={{ width: '40px'}}>&nbsp;</div>;
    }

    // read페이지는 홈버튼 보이게
    return homeImg;
  }

  return (
      <Router>
        <div className="main">
          <div className="content">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

            }}>
              <h2 className="main-header" style={{margin: 0}}>React Crud Operations</h2>

              <HomeIconComponent />
            </div>
            
            <div>
              <Routes>
                <Route exact path='/' Component={Create} />
              </Routes>
              <div style={{ marginTop: 20 }}>
                <Routes>
                  <Route exact path='/read' Component={Read} />
                </Routes>
              </div>
              <Routes>
                <Route path='/update' Component={Update} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;