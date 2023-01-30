import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../../config/api"
import { useNavigate } from "react-router-dom"
import ModalPopUpToping from "../../component/popup/PopUpToping"

const style = {
  textTitle: {
    fontWeight: "600",
    fontSize: "32px",
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

  ImgToping: {
    position: "relative",
    width: "350px",
  },
}

function AddToping() {
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)
  const [DataToping, setDataToping] = useState({
    nametopping: "",
    price: 0,
    image: "",
  })

  const handleOnChange = (e) => {
    setDataToping({
      ...DataToping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Store data with FormData as object
      const formData = new FormData()
      formData.set("nametopping", DataToping.nametopping)
      formData.set("price", DataToping.price)
      formData.set("image", DataToping.image[0], DataToping.image[0].name)

      // Insert product data
      const response = await API.post("/topping", formData, config)
      if (response.status === 200) {
        setModalShow(true);
        setTimeout(() => {
          setModalShow(false);
          navigate("/TopingAdmin");
        }, 1000);
      }
      // navigate("/add-product")
    } catch (error) {
      console.log(error)
    }
  })

  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Container className="my-5">
        <Card className="mt-5" style={{ border: "white" }}>
          <Row>
            <Col sm={8}>
              <Card.Body className="m-auto" style={{ width: "80%" }}>
                <Card.Title className="mb-5" style={style.textTitle}>
                  Topping
                </Card.Title>
                <Form
                  onSubmit={(e) => handleSubmit.mutate(e)}
                  id="addToping"
                  className="m-auto mt-3 d-grid gap-2 w-100"
                >
                  <Form.Group className="mb-3 " controlId="nameProduct">
                    <Form.Control
                      onChange={handleOnChange}
                      name="nametopping"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="text"
                      placeholder="Name Toping"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Control
                      onChange={handleOnChange}
                      name="price"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="number"
                      placeholder="Price"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="photoToping">
                    <Form.Control
                      onChange={handleOnChange}
                      name="image"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="file"
                      placeholder="Photo Toping"
                    />
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    style={style.bgColor}
                    type="submit"
                    onClick={() => {
                      setModalShow(true)
                    }}
                  >
                    Add Toping
                  </Button>
                </Form>
              </Card.Body>
            </Col>
            {preview && (
              <Card.Img
                variant="top"
                src={preview}
                alt={preview}
                style={style.ImgToping}
              />
            )}
          </Row>
        </Card>
      </Container>
      <ModalPopUpToping show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default AddToping
