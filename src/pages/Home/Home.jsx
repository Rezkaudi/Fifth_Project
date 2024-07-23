import { Link } from 'react-router-dom'
import "./Home.css"

import ContainerW from '../../component1/Containers/ContainerW'
import Navbar from '../../component1/navbar/Navbar'
import ContainerB from '../../component1/Containers/ContainerB'
import Card from '../../component1/Card'


function Home() {
  const content = [
    { id: "01", name: "facebook", con: "edffffffffff" },
    { id: "02", name: "Google", con: "dddddddddddddd" },
    { id: "03", name: "Linked in", con: "dddgggggggggggg" },
  ]

  return (
    <div className='bg-[#E2E8E4]'>
    <Navbar />
    <ContainerW >
      <div className="text-center" name="/">03</div>
      <div className="col-span-2  text-center">
        <h1 className='text-blue1 font-bold text-3xl my-3'>Welcome in our website</h1>
        <div className=' my-3 text-item'>hhgjhlijk kh khi hkihijkj</div>
        <div className='flex justify-center w-full'>
          <p
            className=" w-20 my-10 bg-buttom px-3 py-1.5 rounded text-sm font-semibold leading-6 text-white shadow-sm hover:bg-buttom/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        </div>
      <div className="text-center" name="/">03</div>
    </ContainerW>

    <div className='container-fluid div1'>
      <div className='bg-sun squer sm:w-full' ></div>
      <div className='bg-blue1 squer2 rounded-tl-large rounded-br-large sm:hidden lg:block' ></div>
      <div className='bg-blue1 squer3 sm:hidden lg:block' ></div>
    </div>
    <h1 className='w-full bg-buttom text-center text-white font-bold py-5' style={{ "paddingTop": "10rem" }}>Rated 5 out of 5 stars by our users</h1>
    <ContainerB>
      {
        content.map(cont => <Card key={cont.id} name={cont.name} content={cont.con} />)
      }
    </ContainerB>
    <div className='grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 px-10 py-32'  name='service'>
      <div className='justify-center flex '>
        <div className='text-left mt-32'>
          <p className='text-4xl text-blue1 font-bold'>some big text</p>
          <p className=' text-item '>some small text</p>
        </div>
      </div>
      <div className='justify-center flex'>
        <div className='justify-center flex' style={{ height: "500px", width: "100%" }}>
          <div className='bg-sun squer4' ></div>
        </div>
      </div>
    </div>
    <ContainerB>
      <div className='justify-center flex pb-5' name='contact'>
        <div className='text-left '>
          <p className='text-2xl text-white '>Logo</p>
          <p className=' text-white '>some small text</p>
        </div>
      </div>
      <div className='justify-center flex pb-5'>
        <div className='text-left '>
          <p className='text-2xl text-white '>Contact Us</p>
          <p className=' text-white '>some small text</p>
        </div>
      </div>
      <div className='justify-center flex'>
        <div className='text-left '>
          <p className='text-2xl text-white '>Follow Us</p>
          <p className=' text-white '>some small text</p>
        </div>
      </div>
    </ContainerB>
  </div>


  )
}

export default Home