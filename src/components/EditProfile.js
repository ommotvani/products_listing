import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { editProfileValidationSchema } from '../constants/validationschema'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function EditProfile() {

  const navigate = useNavigate()


  //get data of register users and login user from local storage 

  const oldData = JSON.parse(localStorage.getItem('Auth'))
  const alluser = JSON.parse(localStorage.getItem('Users'))


  const onsubmit = (values) => {


    // filter user from register user array 
    const uniqueUser = alluser.filter((ele) => ele.email !== oldData.email)
    const checkUser = uniqueUser.filter((ele) => ele.email === values.email)

    if (checkUser.length > 0) {
      toast.error("user already exit")
    } else {
      //check login email and register user email and set edit profile data 
      const findUser = alluser.find((ele) => ele.email === oldData.email)
      console.log(findUser)
      findUser.firstname = values.firstname
      findUser.lastname = values.lastname
      findUser.email = values.email
      findUser.phoneno = values.phoneno

      //set edit profile data into register users array and login user object 
      localStorage.setItem("Users", JSON.stringify(alluser))
      localStorage.setItem("Auth", JSON.stringify(findUser))
    }

  }


  return (
    <div>
      <Formik
        initialValues={oldData}
        validationSchema={editProfileValidationSchema}
        onSubmit={onsubmit}>
        <Form>
          <div className='input_field'>
            <label htmlFor="firstname">FirstName:</label>
            <Field type="text" name="firstname" id="firstname" className="field" />
            <ErrorMessage name="firstname" />
          </div>

          <div className='input_field'>
            <label htmlFor="lastname">LastName:</label>
            <Field type="text" name="lastname" id="lastname" />
            <ErrorMessage name="lastname" />
          </div>

          <div className='input_field'>
            <label htmlFor="email">Email:</label>
            <Field type="text" name="email" id="email" />
            <ErrorMessage name="email" />
          </div>

          <div className='input_field'>
            <label htmlFor="phoneno">Phoneno:</label>
            <Field type="number" name="phoneno" id="phoneno" />
            <ErrorMessage name="phoneno" />
          </div>

          <div className='input_field'>
            <Button type='submit'> Submit </Button>
            <Button type="primary" className='back_btn' onClick={() => navigate("/products")} >back </Button>
          </div>


        </Form>

      </Formik>
    </div>
  )
}

export default EditProfile