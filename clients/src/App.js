import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { API, setAuthToken } from "./config/api.js"
import { UserContext } from "./context/UserContext"
import Navs from "./component/navbar/Navbar.js"
import Home from "./pages/Home.js"
import Cart from "./pages/user/Cart.js"
import DetailProduct from "./pages/user/DetailProduct.js"
import Profile from "./pages/user/Profile.js"
import Income from "./pages/admin/Admin.js"
import AddProduct from "./pages/admin/AddProduct.js"
import ProductAdmin from "./pages/admin/ProdutAdmin.js"
import UpdateProduct from "./pages/admin/UpdateProduct.js"
import AddToping from "./pages/admin/AddToping.js"
import TopingAdmin from "./pages/admin/TopingAdmin.js"
import UpdateToping from "./pages/admin/UpdateToping.js"
import LoadingPages from "./component/loadingPages/LoadingPages.js"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/")
    }
  }, [state])

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth")

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        })
      }

      // Get user data
      let payload = response.data.data
      // Get token from local storage
      payload.token = localStorage.token

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
      setIsLoading(false)
    } catch (error) {
      // console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingPages />
      ) : (
        <>
          <Navs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/DetailProduct/:id" element={<DetailProduct />} />
            <Route path="/Carts" element={<Cart />} />
            <Route path="/Profile" element={<Profile />} />
            {/* <Route path="/Transaction" element={<Transaction />} /> */}
            {/* <Route path="/HistoryOrder" element={<HistoryOrder />} /> */}
            {/* <Route path="/Admin" element={<Income />} /> */}
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/AddToping" element={<AddToping />} />
            <Route path="/ProductAdmin" element={<ProductAdmin />} />
            <Route path="/TopingAdmin" element={<TopingAdmin />} />
            <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
            <Route path="/UpdateToping/:id" element={<UpdateToping />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
