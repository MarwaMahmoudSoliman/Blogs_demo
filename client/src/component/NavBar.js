import React, { useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserhData, logout, userLogout } from "../rtk/slices/userSlice";

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.data?.user);

  const isLogin = useSelector((state) => state.user?.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserhData());
  }, []);

  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => {
        navigate("/register");
      })
      .catch((error) => {
        // Handle error if logout fails
        console.error(error);
      });
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        data-bs-theme="dark"
        className="bg-dark fixed-top"
      >
        <Container>
          <Nav>
            <Link to="/" className="nav-link">
              BLOG APP
            </Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isLogin && user?.role === "ADMIN" && (
                <Link to="/blogs" className="nav-link">
                  BLOGS
                </Link>
              )}
              <Link to="/" className="nav-link">
                MY BLOG
              </Link>
              <Link to="/add" className="nav-link">
                CREATE BLOG
              </Link>
            </Nav>
            <Nav>
              {!isLogin && (
                <>
                  <Link to="/login" className="nav-link">
                    LOGIN
                  </Link>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </>
              )}
              {isLogin && (
                <Link
                  to="/register"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  {user &&
                    "Hello " +
                      user.firstName +
                      " " +
                      user.lastName +
                      "  Logout"}
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
