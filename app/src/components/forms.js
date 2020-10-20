import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MyFirstFormik = () => {
  return (
    <Formik
      initialValues={{ firstname: '', lastname: '', email: '' }}
      validationSchema={Yup.object({
        firstname: Yup.string()
          .min(2, 'Too short')
          .max(15, 'Must less than 15 charachters')
          .required('Required'),
        lastname: Yup.string()
          .min(2, 'Too short')
          .max(20, 'Must less than 20 charachters')
          .required('Required'),
        email: Yup.string().email('Not a valid email').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className='container m-4'>
        <label htmlFor='firstname'>First Name</label>
        <Field
          name='firstname'
          type='text'
          className='form-input'
          placeholder='Jane'
        />
        <ErrorMessage name='firstname' />
        <br />

        <label htmlFor='lastname'>Last Name</label>
        <Field name='lastname' type='text' className='form-input' />
        <ErrorMessage name='lastname' />
        <br />

        <label htmlFor='email'>Email</label>
        <Field name='email' type='email' />
        <ErrorMessage name='email' />
        <br />
        <label htmlFor='message'>Message</label>
        <Field name='message' as='textarea' className='form-input' />
        <br />

        <Field name='Gender' as='select' className='my-select'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='declined'>Prefer not to respond</option>
        </Field>

        <br />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};

export default MyFirstFormik;

/////////////////////////////////////////////////////////////////////////////////////////////

//Long Fromat
// Custom Validation
// const validate = values => {
//   const errors = {};
//   if (!values.firstname) {
//     errors.firstname = 'Required'
//   } else if (values.firstname.length > 15) {
//     errors.firstname = 'Name too long'
//   } else if (!/[a-zA-Z]$/i.test(values.firstname)) {
//     errors.firstname = 'English characters only'
//   } ;

//   if (!values.lastname) {
//     errors.lastname = 'Required'
//   } else if (values.lastname.length > 20) {
//     errors.lastname = `Can't be more than 20 characters`
//   } else if (!/[a-zA-Z]$/i.test(values.lastname)) {
//     errors.lastname = 'English characters only'
//   }
//   ;

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Not a valid email address'
//   }

//   return errors;
// }

// export default function SignupForm () {

//   const formik = useFormik({
//     initialValues: {
//       email:'',
//       firstname:'',
//       lastname:'',
//     },
//     validationSchema: Yup.object({
//       firstname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
//       lastname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
//       email: Yup.string().email('Not a valid email')
//     }),
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <form onSubmit={formik.handleSubmit} className="m-5">
//       <label htmlFor="firstname">First Name</label>
//         <input
//           id='firstname'
//           //name='firstname'
//           type='text'
//           // onChange={formik.handleChange}
//           // onBlur= {formik.handleBlur}
//           // value={formik.values.firstname}
//           {...formik.getFieldProps('firstname')}
//         />
//       {formik.touched.firstname && formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}
//     <br />
//     <label htmlFor="lastname">Last Name</label>
//     <input id='lastname'type='text'{...formik.getFieldProps('lastname')}/>
//     {formik.touched.lastname && formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}
//     <br />
//       <label htmlFor="email">Email Address</label>
//       <input id="email" type="email"{...formik.getFieldProps('email')}/>
//       {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
