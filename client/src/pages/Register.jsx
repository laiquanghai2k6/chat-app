import { useContext, useEffect } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import AuthContextProvider, { AuthContext } from "../context/AuthContext";


const Register = () => {
    const {user, registerInfo, updateRegisterInfo, registerUser, registerError,isRegisterLoading } = useContext(AuthContext)
    const inputHandler = (event, z) => {
        let a = {}
        a[z] = event.target.value
        updateRegisterInfo({ ...registerInfo, ...a })


    }
    useEffect(()=>{
        console.log(user)
    },[user])
return (<>
        <Form onSubmit={async (e)=>{
            
            await registerUser(e)
            
            }}>
            <Row style={{
                height: '100vh',
                justifyContent: 'center',
                paddingTop: '10%'
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Register</h2>
                       
                        <Form.Control type="text" placeholder="Name" onChange={(e) => inputHandler(e, 'name')} />
                        <Form.Control type="email" placeholder="Email" onChange={(e) => inputHandler(e, 'email')} />
                        <Form.Control type="password" placeholder="Password" onChange={(e) => inputHandler(e, 'password')} />
                        <Button variant="primary" type="submit">
                            {isRegisterLoading ? 'Creating':'Register'}
                        </Button>
                        {registerError?.error ? (
                            <Alert variant="danger">
                                <p>
                                    {registerError?.message.error}
                                </p>
                            </Alert>
                        ):(
                            <></>
                        )}

                    </Stack>
                </Col>
            </Row>
        </Form>
    </>);
}

export default Register;