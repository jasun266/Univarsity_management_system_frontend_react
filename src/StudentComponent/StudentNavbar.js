
import { Link } from 'react-router-dom';



function StudentNavbar ()
{
  




  
  return(
    <div className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Univarsity Management System</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/OfferedCourses">Go To Registration</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">Show Registered Sections</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/MyCourses">MyCourses</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default StudentNavbar;