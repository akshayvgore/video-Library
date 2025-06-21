import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import  * as yup from "yup";


export function AdminLogin(){

    let navigate = useNavigate();

    

    


    return(
        <div className="d-flex justify-content-center align-content-center">
        <div className="bg-light p-4 m-4 w-25 rounded rounded-4">
            <h3>Admin Login</h3>
            <Formik
            initialValues= {{
            UserId: '',
            Password: ''
        }}
        validationSchema={yup.object({
            UserId: yup.string().required("UserId Required"),
            Password: yup.string().required("Password Required")
        })}
        onSubmit= {(admin)=> {
            axios.get('http://127.0.0.1:5050/get-admin')
            .then(response=>{
                 var user = response.data.find(item=> item.UserId===admin.UserId);
                 if(user){
                     if(admin.Password===user.Password){
                        navigate("/admin-dash");
                     } else {
                        alert(`Invalid Password`);
                     }
                 } else {
                    alert(`Invalid User Id`);
                 }
            })
        }}>
        <Form>
            <dl>
                <dt>Admin Id</dt>
                <dd>{/*Use Formik's Field instead of input*/}
                <Field type="string" name="UserId" /></dd>
                <dd className="text-danger"><ErrorMessage name="UserId"/></dd>
                
                <dt>Password</dt>
                <dd><Field type="string" name="Password"  /></dd>
                <dd className="text-danger"><ErrorMessage name="Password"/></dd>
            </dl>
            <button className="btn btn-warning w-100">Login</button>
            <Link to="/" className="mt-4"> Back to Home </Link>
        </Form>
        </Formik>
    </div>
    </div>
    )
}