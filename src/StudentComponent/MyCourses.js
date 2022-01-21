import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Form} from 'react-bootstrap';

function MyCourses() 
{
    const [MyCourses ,setMyCourses]=useState([]);
    const [Semester ,setSemester]=useState([]);
    const [SemesterState ,setSemesterState]=useState("Fall21-22");


    useEffect(()=>{
            const data ={
                s:SemesterState,
            }

        axios.post(`http://127.0.0.1:8000/api/MyCourses`,data).then(res=>{
            if(res.data.status===201){
                setMyCourses(res.data.MyCourses)
            }
        });
        axios.get(`http://127.0.0.1:8000/api/Semester`).then(res=>{
            if(res.data.status===201){
                setSemester(res.data.Semester)
            }
        });

    },[])

    const SubmitAddToCart = (item,e)=>
    {
       e.preventDefault();
       const clickevent = e.currentTarget;
       clickevent.innerText ="ADDED";

       const data ={
           course_id:item.course_id,
       }

       axios.post(`http://127.0.0.1:8000/api/MyCourses`,data).then(res=>{
        if(res.data.status===201){
            setMyCourses(res.data.MyCourses)
               
           }
       });

     } 

    var student_HTMLTABLE = "";
       
        student_HTMLTABLE = MyCourses.map( (item,id) => {
            
            return (
                
                <tr key={id}>
                    <td>{item.course_id}</td>
                    <td>{item.course_name}</td>
                    <td>{item.schedule}</td>
                    <Link to={`/MyCourses/${item.course_id}`}>
                    <td><button className='btn btn-success'>View course</button></td>
                    </Link>
                </tr>
            );
        });
        var sm = "";
       
        sm = Semester.map( (item,id) => {
            
            return (
                <option key={id} value={item.semester_id}>{item.semester_id}</option>
                
            );
        });


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <Form.Select aria-label="Default select example" onChange={(e)=>
                        {const semesterid=e.target.value;setSemesterState(semesterid);}}>
                         {sm}  
                    </Form.Select>
                        <div className="card">
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Course ID</th>
                                            <th>Course Name</th>
                                            <th>Date & Time</th>
                                            <th>Course Details</th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                    {student_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default MyCourses
