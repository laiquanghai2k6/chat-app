import { useContext } from "react";
import { Alert, Button, Col, Form, Row,Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
    const {loginUser,updateLoginInfo,loginInfo,loginError} = useContext(AuthContext)
        const handlerInput = (key,event)=>{
            let temp = {}
            temp[key] = event.target.value
            updateLoginInfo({...loginInfo,...temp})
        }
    return ( 
        <Form onSubmit={loginUser}>
            <Row style={{
                 height: '100vh',
                 justifyContent: 'center',
                paddingTop: '10%'
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                    <h2>Login</h2>
                        <Form.Control placeholder="email" type="email" onChange={(e)=>handlerInput('email',e)} />
                        <Form.Control placeholder="password" type="password" onChange={(e)=>handlerInput('password',e)} />
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        {loginError?.error ? (
                            <Alert variant="danger">
                                <p>
                                    {loginError?.message}
                                </p>
                            </Alert>
                        ):(
                            <></>
                        )}
                    </Stack>
                </Col>
            </Row>
        </Form>
     );
}
 
export default Login;