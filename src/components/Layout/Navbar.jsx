import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../../context/AuthContext';
import {Button, AppBar, Toolbar, Typography} from "@mui/material";

const Navbar = () => {
    const {user, singOut} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        singOut();
        navigate("/login");
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography
                    variant="h6" component="div" sx={{flexGrow: 1}}>
                    Tea E-Com
                </Typography>
                {user ?(<>
                                <Typography sx={{fontFamily: "segoe ui"}}>Hello {user.name}</Typography>
                                <Button
                                        color="error" variant="contained"
                                        onClick={handleLogout}
                                        sx={{marginLeft: 2 , fontFamily: "Grow"}}
                                >Logout</Button>
                            </>): (<>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                            </>
                        )
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;