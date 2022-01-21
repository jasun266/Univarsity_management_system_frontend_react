import OfferedCourses  from './StudentComponent/OfferedCourses'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentNavbar from './StudentComponent/StudentNavbar'
import Cart from './StudentComponent/Cart'
import MyCourses from './StudentComponent/MyCourses'
import CourseDetails from './StudentComponent/CourseDetails'
import Login from './Login';
import axios from 'axios';
//axios.defaults.baseURL = "http://localhost:8000/";
var token=null;
if(localStorage.getItem('user')){
  var obj = JSON.parse(localStorage.getItem('user'));
  token = obj.access_token;
}
axios.defaults.headers.common["Authorization"] = token;

function App() {
  return (
    <div className="App">
    <Router>

      <StudentNavbar/>

        <Routes>

          <Route path="/OfferedCourses" element={<OfferedCourses/>} />
          <Route path='/Cart' element={<Cart/>}/>
          <Route path="/MyCourses" element={<MyCourses/>}/>
          <Route path='/MyCourses/:CourseID' element={<CourseDetails/>}/>
          <Route path='/' element={<Login/>}/>
        </Routes>

      </Router>   

    </div>
  );
}

export default App;
