import { ErrorMessage, Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../ui';
import { Box, OutlinedInput, TextField, TextFieldProps } from '@mui/material';

import { AuthService } from '../../../services/auth.service';
import { useActions } from '../../../hooks/useActions';
import { IEmailPassword } from '../../../store/user/user.interfaces';

import styles from '../Auth.module.css';
import { useAuth } from '../../../providers/AuthProvider';
interface LoginProps {
    
}

interface ILoginFormValues {
    email: string;
    password: string;
}


interface MyTextFieldProps {
    name: string;
    type: string;
}

const MyTextField: React.FC<MyTextFieldProps & TextFieldProps> = ({name, type, label}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
        <label className={styles.inputLabel}>{label}</label>
         <input
            className={styles.inputField}
            name = {name}
            type={type}
            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {helpers.setValue(e.target.value)}}/>
        <ErrorMessage 
        className={styles.errorMessage}
        name={name}
        component="div" />
        </Box>
    );
};
 
const Login: React.FC<LoginProps> = () => {


    const boundActionCreators = useActions();
    const { closeAuthModal } = useAuth()

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
                .email('Wrond email')
                .required('This field is required.'),
        password: Yup.string()
                .min(4, 'Min 4 letters')
                .required('This field is required.')
    });


    const loginFormInitialValues : ILoginFormValues = {
        email: '',
        password: ''
    };

    const onSubmitLoginForm = (values: ILoginFormValues): void => {

        const emailPassword: IEmailPassword = {
            email: values.email,
            password: values.password
        }

        boundActionCreators.login(emailPassword);
        closeAuthModal();
    
    };


    return ( <Formik
        initialValues={loginFormInitialValues}
        onSubmit={(values) =>  {
            onSubmitLoginForm(values);
        }}

        validationSchema = {loginValidationSchema}>
        {() => (
            <Form className={styles.form}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <MyTextField
                        name="email"
                        type="text"
                        label="Email"
                        sx={{borderColor: "white"}}/>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <MyTextField
                        label="Password"
                        name="password"
                        type="password" />
                </Box>
                <Button type="submit" className={styles.submit}>
                    Login
                </Button>
            </Form>
        )
        }
        </Formik>);
}
 
export default Login;