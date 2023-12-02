import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, baseURL } from "../../store/actions"

// import images
import logo1 from "../../assets/images/logo-1.jpg"
import logo2 from "../../assets/images/logo-2.jpg"

const Login = props => {
  const [school, setSchool] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  const handleScoolType = type => {
    setSchool(type)
    props.baseURL(type)
    localStorage.setItem("school", type)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Leads Kendriya Vidyalaya</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <div className=" d-flex justify-content-center mt-3">
                    <div>
                      {" "}
                      <img src={logo1} alt="" height="50" />
                    </div>

                    
                  </div>
                  <h3 className="text-center mt-1 mb-2">
                    <Link to="/" className="d-block auth-logo">
                      Shree Bhagya Jyothi Vidya Samsthe
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Welcome Back !
                    </h4>
                    <p className="text-muted text-center">
                      Sign in to continue...
                    </p>
                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          type="select"
                          name="userType"
                          label="User Type"
                          value={userType}
                          onChange={e => setUserType(e.target.value)}
                          className="form-control"
                          placeholder="User Type"
                        >
                          <option>--</option>
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                        </AvField>
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value={userName}
                          onChange={e => setUserName(e.target.value)}
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          type="text"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, baseURL })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
