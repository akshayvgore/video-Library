import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export function UserRegister() {
    let navigate = useNavigate();

    

    // const formik = useFormik({
    //     initialValues: {
    //         UserId: '',
    //         UserName: '',
    //         Password: '',
    //         Email: '',
    //         Mobile: ''
    //     },
        

    return (
        <div className="d-flex justify-content-center align-content-center">
            <div className="rounded rounded-3 bg-light p-4 w-25 m-3 overflow-auto" style={{height:'400px'}}>
                <h3>User Register</h3>
                <Formik  initialValues={{
                    UserId: '',
                    UserName: '',
                    Password: '',
                    Email: '',
                    Mobile: ''
                }}
                     validationSchema = {yup.object({
                    UserId: yup.string().required("User ID is required"),
                    UserName: yup.string().required("User Name is required"),
                    Password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
                    Email: yup.string().email("Invalid email address").required("Email is required"),
                    Mobile: yup.string().required("Mobile number is required").matches(/\d{10}/, "Invalid Mobile")              
                })} onSubmit={ async (user) => {
            
                    await axios.post(`http://127.0.0.1:5050/register-user`, user);
                    alert('User Registered Successfully...');
                    navigate('/user-login');
                        
                    }
            }>
                
                {
                   form=> <Form>
                    <dl>
                        <dt>User Id</dt>
                        <dd><Field type="string"  name="UserId" /></dd>
                        <dd className="text-danger"> <ErrorMessage name="UserId" /> </dd>

                        <dt>User Name</dt>
                        <dd><Field type="string" name="UserName" /></dd>
                        <dd className="text-danger"> <ErrorMessage name="UserName" /> </dd>

                        <dt>Password</dt>
                        <dd><Field type="string" name="Password" /></dd>
                        <dd className="text-danger"> <ErrorMessage name="Password" /> </dd>

                        <dt>Email</dt>
                        <dd><Field type="string" name="Email" /> </dd>
                        <dd className="text-danger"> <ErrorMessage name="Email" /> </dd>

                        <dt>Mobile</dt>
                        <dd><input type="string" name="Mobile" /></dd>
                        <dd className="text-danger"> <ErrorMessage name="Mobile" /> </dd>

                    </dl>
                    <button className="btn btn-warning" type="submit"> Login
                    </button>
                    <div className="my-2">
                        <Link to="/user-login"> Existing User Login </Link>
                    </div>
                    <div className="my-2">
                        <Link to="/admin-login"> Admin Login </Link>
                    </div>
                </Form>
                }
                </Formik>
            </div>
        </div>
    );
}