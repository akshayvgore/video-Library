import axios from "axios";
//import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export function UserLogin(){


    const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);

    const [cookies, setCookie, removeCookie] = useCookies(['username']);

    let navigate = useNavigate();

    // const formik = useFormik({
    //     initialValues: {
    //         UserId:'',
    //         Password:''
    //     },
    //     onSubmit: (user)=>{
    //         axios.get(`http://127.0.0.1:5050/get-users`)
    //         .then(response=>{
    //             var result = response.data.find(item=> item.UserId===user.UserId);
    //             if(result){
    //                 if(result.Password===user.Password){
    //                     setCookie('username', result.UserName);
    //                     navigate('/user-dash');
    //                 } else {
    //                     alert('Invalid Password');
    //                 }
    //             } else {
    //                 alert('Invalid User Id')
    //             }
    //         }) 
    //     }
    // })

    return(
        <div className="d-flex justify-content-center align-content-center">
            <div className="bg-light p-4 m-4 w-25 rounded rounded-5">
            <div>
                <Link to="/" className="text-dark bi bi-chevron-left rounded rounded-circle p-2 bg-secondary-subtle"> </Link>
            </div>
            <h3>User Login</h3>
            <Formik
                initialValues ={{
                    UserId:'',
                    Password:''
                }}
                validationSchema={yup.object({
                    UserId:yup.string().required("UserId Required"),
                    Password:yup.string().required("Password Required")
            })}
                onSubmit= {(user)=>{
                axios.get(`http://127.0.0.1:5050/get-users`)
                .then(response=>{
                    var result = response.data.find(item=> item.UserId===user.UserId);
                    if(result){
                        if(result.Password===user.Password){
                            setCookie('username', result.UserName);
                            navigate('/user-dash');
                        } else {
                            alert('Invalid Password');
                        }
                    } else {
                        alert('Invalid User Id')
                    }
                }) 
            }}>
            <Form>
                <dl>
                    <dt>User Id</dt>
                    <dd><Field type="string" name="UserId"/></dd>
                    <dd className="text-danger"><ErrorMessage name="UserId"/></dd>

                    <dt>Password</dt>
                    <dd><Field type="string" name="Password"/></dd>
                    <dd className="text-danger"><ErrorMessage name="Password"/></dd>
                </dl>
                <button type="submit" className="btn btn-warning"> Login </button>
                <div className="my-2">
                <Link to="/user-register">New User Register</Link>
                </div>
            </Form>
            </Formik>
        </div>
     </div>
    )
}