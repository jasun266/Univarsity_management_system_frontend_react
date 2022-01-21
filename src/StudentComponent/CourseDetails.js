import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function CourseDetails() 
{
    const [CourseDetails ,setCourseDetails]=useState([])
    const [notes ,setnotes]=useState([]);
    const [NotoceById ,setNotoceById]=useState([]);
    const {CourseID} =useParams();
    const [show, setShow] = useState(false);
    const [Notices ,setNotice]=useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/MyCourses/${CourseID}`).then(res=>{
            if(res.data.status===200){
                setCourseDetails(res.data.CourseDetails)
                setnotes(res.data.notes)
                setNotice(res.data.Notices)
            }
        });
    },[])
    const handaleInput = (item,e)=>
    {
        e.preventDefault();
        const NoticeID=item;

        axios.get(`http://127.0.0.1:8000/api/Notices/${NoticeID}`).then(res=>{
            if(res.data.status===200){
                setNotoceById(res.data.NoticeById)
                
            }
        });

    } 

    var note = "";  
    note = notes.map( (item, kid) => {
        
        return (
            <tr key={kid}>
                    <td>{item.lecture_name}</td>
                    <td>{item.time}</td>
                    <td><button className='btn btn-primary'>Download</button></td>
                </tr>
            
        );
    });
    var Nts = "";
    Nts = Notices.map( (item, kid) => {
    
        return (
            <tr key={kid}>
                    <td>{item.title}</td>
                    <td>{item.upload_time}</td>
                    <td><Button className="btn btn-dark" onClick={(e)=>{handleShow();handaleInput(item.id,e)}}>View</Button></td>
                    <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>{NotoceById.title}</Modal.Title>
                                    </Modal.Header>
                                    <h6 className="text-center px-3">{NotoceById.description}</h6>
                                    <Modal.Body>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
            </tr>
            
        );
    });
    

    return (
        <>
            <div className="container">
                <div className="row">
                        <div className="card col-md-6 px-3">
                            <h3>Course Details</h3>
                            <div className="card-body ">
                                
                                <table className="table table-bordered table-striped">
                                <tr>
                                    <th>Course ID:</th>
                                    <td>{CourseDetails.course_id}</td>
                                </tr>
                                <tr>
                                    <th>Course Name:</th>
                                    <td>{CourseDetails.course_name}</td>
                                </tr>
                                <tr>
                                    <th>Course Teacher Name:</th>
                                    <td>{CourseDetails.teacher}</td>
                                </tr>
                                <tr>
                                    <th>Date & Time:</th>
                                    <td>{CourseDetails.schedule}</td>
                                </tr>
                                </table>

                            </div>
                        </div>
                        <div className="card col-md-6 px-3">
                        <h3>Notes</h3>
                        <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Upload Date</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                             {note}
                       </tbody>
                       </table>
                        </div>
                        <div className="card col-md-6 px-3">
                        <h3>Notices</h3>
                        <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Upload Date</th>
                                <th>View</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                             {Nts}
                       </tbody>
                       </table>
                        </div>
                </div>
            </div>            
        </>
    )
}

export default CourseDetails
