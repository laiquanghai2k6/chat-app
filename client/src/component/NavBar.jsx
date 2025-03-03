import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const NavBar = () => {
    const {user,logOutUser} = useContext(AuthContext)
    return (
        <Navbar className="mb-4" bg="dark" style={{height:"3.75rem"}}>

            <Container>
                <h2>
                    <Link to='/' className="link-light text-decoration-none">
                    ChatApp
                    </Link>
                </h2>
                <span className="text-warning">log in as {user?.name}</span>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {
                            !user ? (
                                <Link to='/login' className="link-light text-decoration-none">
                                login
                                </Link>
                            ) : (
                                <Link to='/register' className="link-light text-decoration-none" onClick={()=>{
                                    logOutUser()
                                    // socket.disconnect()
                                    }}>
                                logout
                                </Link>
                            )
                                
                            
                        }
                       
                        {!user && <Link to='/register' className="link-light text-decoration-none">
                        Register
                        </Link>}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;