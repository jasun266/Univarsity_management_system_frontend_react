import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useCart}from 'react-use-cart'

function OfferedCourses() 
{

    const { addItem,totalUniqueItems,inCart} = useCart();

    const [OfferedCourses, setOfferedCourses] = useState([]);

    

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/OfferedCourses`).then(res=>{
            if(res.status === 200)
            {
                setOfferedCourses(res.data.OfferedCourse);
            }
        });

    },[]);

    const SubmitAddToCart = (item,e)=>
     {
        e.preventDefault();
        const clickevent = e.currentTarget;
        clickevent.innerText ="ADDED";

        const data ={
            course_id:item.course_id,
        }

        axios.post(`http://127.0.0.1:8000/api/Add-To-Cart`,data).then(res=>{
            if(res.data.status===201){

                
            }
        });

      } 
        
  
    

        var student_HTMLTABLE = "";
       
        student_HTMLTABLE = OfferedCourses.map( (item,id) => {
              
            item.price=1500 
            
            return (
                
                <tr key={id}>
                    <td>{item.course_id}</td>
                    <td>{item.course_name}</td>
                    <td>{item.schedule}</td>
                    <td><button className='btn btn-success' onClick={(e) => 
                        {if(totalUniqueItems<5 && !inCart(item.id)){addItem(item)}
                        if(inCart(item.id)){window.alert("You already selected this course");}
                        if(totalUniqueItems<5 && !inCart(item.id)){SubmitAddToCart(item,e)}}}>Add this course</button></td>
                    
                </tr>
            );
        });

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Course ID</th>
                                            <th>Course Name</th>
                                            <th>Date & Time</th>
                                            <th>Add</th>
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
        </div>
    );

}

export default OfferedCourses;