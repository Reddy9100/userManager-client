import { Link } from "react-router-dom"
import About from "./about"
import { useEffect } from "react"
import Aos from "aos"

const Home = () => {
  useEffect(()=>{
    console.log("rendered")
    Aos.init({duration:3000})
  })
  return (
    <>
      <div className="h-screen overflow-x-hidden p-10 bg-black flex flex-col justify-center items-center " style={{fontFamily : "Orbiton ,sans serif"}}>
        <h1 className="text-5xl text-white" data-aos= "fade-up">Control, Access, Security: User Management Made Easy.</h1>
        <Link to="/admin">
          <button  className="bg-white text-orange-500 font-semibold p-3 mt-24 rounded-xl animate-pulse" title="Admins Only">
            Admin Portal
          </button>
        </Link>
      </div>
      <About/>
    </>
  )
}

export default Home
