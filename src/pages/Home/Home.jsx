import { Link } from 'react-router-dom'
import "./Home.css"

import ContainerW from '../../component1/Containers/ContainerW'
import Navbar from '../../component1/navbar/Navbar'
import ContainerB from '../../component1/Containers/ContainerB'
import Card from '../../component1/Card'
import ConfigIcon from "../../assets/images/icon _cog -c2.svg"
// import PenIcon from "../../assets/images/edit-04-c2.svg"
import AutoSlider from '../../component/Slider'
import Logo from "../../assets/images/logo.png"
import ContactForm from '../../component/ContactForm'
import Doc from "../../assets/images/undraw_contract_re_ves9.svg"

import { FaDatabase } from 'react-icons/fa';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';

function Home() {
  const content = [
    { id: "01", name: <FaDatabase size={80} />, con: " API on the front-end using for getting information from a server and using it in the user interface, enabling real-time data retrieval and creating dynamic user experiences. However, not all APIs are limited to these as they have various functions and usage. " },
    { id: "02", name: <FaProjectDiagram size={80} />, con: "API is a set of rules and valuable tools that allows different applications to communicate with each other. Depending on the API's type and the communication methods it enables, information can be shared easily and integration services help increase the developers’ performance and save considerable time.." },
    { id: "03", name: <FaTools size={80} />, con: "Different APIs emerge for frontend development. In our website, we provide experience that are help to get api you need. If you are need using it, make sure proficient with different API integration." },
  ]

  return (
    <div className='bg-[#E2E8E4]'>
      <Navbar />
      <ContainerW >
        <div className="flex justify-center items-center w-10 h-10 mt-10 absolute left-10">
          <img className='w-10 animate-rotate' src={ConfigIcon} alt="ConfigIcon" />
        </div>
        <div className="col-span-2 text-center flex items-center flex-col">
          <h1 className='text-c1 font-bold text-3xl mb-5'>Welcome in Builder Api</h1>
          <span className='text-c2 text-xl my-3 w-[300px] flex sm:w-full max-w-[900px] pt-5'>
          We have developed this system to assist front-end developers in creating secure and valid APIs through a user-friendly interface with straight forward steps.           </span>
          <div className='flex justify-center'>
            <p
              className=" w-20 my-10 bg-buttom px-3 py-1.5 rounded text-sm font-semibold leading-6 text-white shadow-sm hover:bg-buttom/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-start w-10 h-10 mt-10 absolute right-10">
          <img className='w-10 animate-rotate' src={ConfigIcon} alt="ConfigIcon" />
        </div>
      </ContainerW>

      <div className='container-fluid div1 mt-44 sm:mt-20'>
        <div className='bg-white border-2 rounded border-white mx-5 my-10 w-3/4 h- sm:max-w-[700px] sm:max-h-[400px] max-h-[200px]' data-aos="fade-in" >
          <AutoSlider />
        </div>
        {/* <div className='bg-blue1 squer2 rounded-tl-large rounded-br-large sm:hidden lg:block' data-aos="fade-right"></div> */}
        {/* <div className='bg-blue1 squer3 sm:hidden lg:block' data-aos="fade-left"></div> */}
      </div>
      <div className='w-full bg-buttom text-center text-white font-bold py-5' style={{ "paddingTop": "10rem" }} />
      <ContainerB>
        {
          content.map(cont => <Card key={cont.id} name={cont.name} content={cont.con} />)
        }
      </ContainerB>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-10 py-32 ' name='service' >
        <div className='justify-center flex'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left '>Documentation</p>
            <p className=' text-item mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 '>
              To use an API effectively, it is essential to have an in-depth understanding of the documentation provided. This documentation outlines important details such as endpoints, data formats, and authentication methods, ensuring a successful implementation.uou must know there are many kinds of API such as HTTP APIs ,REST (Representational State Transfer, or RESTful API) and Third-party SDKs
            </p>
          </div>
        </div>
        <div className='justify-center flex'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full' src={Doc} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div name="contact">
        <ContactForm />
      </div>


      {/* <ContainerB>
        <div className='justify-center flex'>
          <div className='text-left'>
            <p className='justify-center flex text-white mb-2'>
              <img className="w-32" src={Logo} alt="logo" />
            </p>
            <p className=' text-white text-center'>Creator APIs for small projects</p>
          </div>
        </div>
        <div className='justify-center'>
          <div className='text-left '>
            <p className='text-2xl text-white '>Links</p>
            <p className=' text-white '>
              <Link to={"/"}>Home</Link>
            </p>
            <p className=' text-white '>
              <Link to={"/"}>Documentation</Link>
            </p>
            <p className=' text-white '>
              <Link to={"/"}>Services</Link></p>
            <p className=' text-white '>
              <Link to={"/"}>contact us</Link>
            </p>
          </div>
        </div>
        <div className='justify-center flex'>
          <div className='text-left '>
            <p className='text-2xl text-white '>Follow Us</p>

          </div>
        </div>
      </ContainerB> */}

<footer className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Company Logo" className="h-8 bg-white rounded" /> {/* Adjust the path to your logo */}
        <span className="text-sm">© 2024 Your Company Name</span>
      </div>
      <div className="hidden sm:flex space-x-4">
        <a href="/" className="text-sm hover:text-gray-300">Privacy Policy</a>
        <a href="/" className="text-sm hover:text-gray-300">Terms of Service</a>
      </div>
    </footer>

    </div>


  )
}

export default Home