import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import { Button, Form, Modal, Alert, Image, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../../config/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const style = {
  textLogin: {
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: "36px",
    lineHeight: "49px",
    color: "#BD0707",
  },

  textRed: {
    color: "#BD0707",
  },

  bgColor: {
    backgroundColor: "#BD0707",
  },

  textCenter: {
    textAlign: "center",
  },

  link: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
  },
}

function Register({ show, onHide, setShowLogin, setShowRegister }) {
  const title = "Register"
  document.title = "waysbucks | " + title

  const [message, setMessage] = useState(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [preview, setPreview] = useState(null)
  const [dataRegis, setDataRegis] = useState({
    fullname: "",
    email: "",
    password: "",
    image: "",
  })

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const handleOnChange = (e) => {
    setDataRegis({
      ...dataRegis,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Store data with FormData as object
      const formData = new FormData()
      formData.set("image", dataRegis.image[0], dataRegis.image[0].fullname)
      formData.set("fullname", dataRegis.fullname)
      formData.set("email", dataRegis.email)
      formData.set("password", dataRegis.password)

      // Insert data user to database
      const response = await API.post("/register", formData, config)
      if (response.data.status === "success...") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        )
        setMessage(alert)
        setDataRegis({
          name: "",
          email: "",
          password: "",
          image: "",
        })
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        )
        setMessage(alert)
      }
      setShowRegister(false)
      setShowLogin(true)
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      )
      setMessage(alert)
      console.log(error)
    }
  })

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <Modal.Title style={style.textLogin}>Register</Modal.Title>
        {message && message}
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Control
              onChange={handleOnChange}
              name="fullname"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="text"
              placeholder="Full Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              onChange={handleOnChange}
              name="email"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <InputGroup className="mb-3 d-flex" controlId="password">
            <Form.Control
              onChange={handleOnChange}
              name="password"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type={isPasswordVisible ? "text" : "password"} 
              placeholder="Password"
            />
            <Button onClick={togglePasswordVisibility} className="px-2"  style={{ border: "2px solid #BD0707", backgroundColor:"transparent", color:"#BD0707" }}>
              {isPasswordVisible ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye} /> }
            </Button>
          </InputGroup>
          <Form.Group className="mb-3" controlId="image">
            {preview && (
              <Image
                src={preview}
                className="mb-4"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            )}
            <Form.Control
              onChange={handleOnChange}
              name="image"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="file"
              placeholder="Image Profil"
            />
          </Form.Group>
          <Button variant="outline-light" style={style.bgColor} type="submit">
            Register
          </Button>
          <Form.Label style={style.textCenter}>
            Already have an account ? Klik
            <Link
              className="ms-1"
              onClick={() => {
                setShowRegister(false)
                setShowLogin(true)
              }}
              style={style.link}
            >
              Here
            </Link>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Register
