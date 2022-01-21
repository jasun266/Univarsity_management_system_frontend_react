import {useCart}from 'react-use-cart'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Cart() {
    const {
      isEmpty,
      emptyCart,
    } = useCart();

    const [CartCourses, setCartCourses] = useState([]);

    

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/Cart`).then(res=>{
            if(res.status === 200)
            {
                setCartCourses(res.data.CartCourses);
            }
        });

    },[]);

    const deleteCart = (e, id)=>
    {
        e.preventDefault();
        const clickevent = e.currentTarget;
        clickevent.innerText ="Removing..";

        axios.delete(`http://127.0.0.1:8000/api/Cart/${id}`).then(res=>{
            if(res.data.status===200){

                console.log('removed')
                clickevent.closest('tr').remove();

            }
        });


    }

    const confirmCourse=(e)=>
    {
        e.preventDefault();
        const clickevent = e.currentTarget;
        clickevent.innerText ="Confirmed";

        axios.get(`http://127.0.0.1:8000/api/confirmCourse`).then(res=>{
            if(res.data.status===200){

                console.log('removed and confirm')

            }
        });

    }


   

  
    var student_HTMLTABLE = "";
       
    student_HTMLTABLE = CartCourses.map( (item, kid) => {
        
        return (
            
            <tr key={kid} >
                <td>{item.course_id}</td>
                <td>{item.course.course_name}</td>
                <td>{item.course.schedule}</td>
                <td><button className='btn btn-danger'onClick={(e)=>{deleteCart(e,item.course_id);}}>Remove</button></td>
                
            </tr>
        );
    });
  
    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
      <>
        {/* <h1>Your selected total ({totalUniqueItems}) Courses.</h1> */}
  
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
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                    {student_HTMLTABLE}
                                    </tbody>
                                    <button className='btn btn-danger'onClick={(e)=>{emptyCart();confirmCourse(e)}}>confirm</button>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );

    

  }

export default Cart
