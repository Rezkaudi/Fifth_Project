import "./Documentation.css"

import Navbar from '../../component1/navbar/Navbar'
import Logo from "../../assets/images/logo.png"
import urls from "../../assets/doc/1.png"
import tokens from "../../assets/doc/2.png"
import getData from "../../assets/doc/3.png"
import postData from "../../assets/doc/4.png"
import filterData from "../../assets/doc/5.png"
import Example from "../../assets/doc/6.png"
import vedio from "../../assets/doc/example.webm"


function Documentation() {

  return (
    <div className='bg-[#E2E8E4]'>
      <Navbar />

      <div className="mt-20 flex items-center justify-center w-full">
        <video className="w-1/2 border-2 border-c1 rounded" src={vedio} loop autoPlay></video>
      </div>

      <h1 className=" text-c1 text-center text-4xl mt-20 font-bold">How to create api used this website</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-32 ' >
        <div className='justify-center flex'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left gradiantText'>Copy APIS</p>
            <p className=' text-item mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 text-base'>
              "First, you need to create a project. Then, create a model with the fields you require, ensuring each field has the appropriate data type. After that, add at least one row to the model. Once you've done this, you can click the 'Copy' button and select the API you need for your request. Note that there are five URLs available for different request types: GET, POST, UPDATE, DELETE, and GET Filter. For DELETE and UPDATE requests, you'll need the row ID of the item you wish to delete or update. Remember, each URL corresponds to a specific action: GET retrieves data, POST adds new data, UPDATE modifies existing data, DELETE removes data, and GET Filter fetches data based on specific criteria. Ensure you select the correct URL for your intended operation."
            </p>
          </div>
        </div>
        <div className='justify-center flex'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full rounded' src={urls} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-32 ' >
        <div className='justify-center flex order-2'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left gradiantText'>Copy Tokens</p>
            <p className=' text-item mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 '>
              To ensure data safety and prevent unauthorized access to the API, you need a token. This token safeguards your API from being used by others. If you need to create a token, navigate to the /token page and click the "Create Token" button. Here, you can assign permissions to the token, such as read, write, or both. After creating the token, include it in the request header under the "Authorization" key. This step is crucial for securely making requests without encountering issues.
            </p>
          </div>
        </div>
        <div className='justify-center flex order-1'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full rounded' src={tokens} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-32 ' >
        <div className='justify-center flex'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left gradiantText'>Get Data from Table</p>
            <p className=' text-item mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 '>
              To perform a GET request, simply copy the URL for the GET request and the token, then include the token in the request header. This will allow you to retrieve the data model.            </p>
          </div>
        </div>
        <div className='justify-center flex'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full rounded' src={getData} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-32 ' >
        <div className='justify-center flex order-2'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left gradiantText'>Add Data to Table</p>
            <p className=' text-item mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 '>
              To perform a POST request, simply copy the URL for the POST request and the token, then include the token in the request header. Add the data you wish to send in the body of the request, either as JSON or form data. This will allow you to submit new data to the model.
            </p>
          </div>
        </div>
        <div className='justify-center flex order-1'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full rounded' src={postData} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-32 ' >
        <div className='justify-center flex'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left gradiantText'>Get Filtered Data</p>
            <p className=' text-item text-lg mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 '>
              This website offers a process for filtering data obtained from the API. You can copy the filter API from the API interface and also copy the token. Next, add the filters according to your needs. The filters support various conditions such as equal, not equal, greater than, greater than or equal to, smaller than, and smaller than or equal to. These filters are applied using a syntax similar to :
              <br />
              <span className="text-xs text-red-400">
                {`?{feildName}={value} mean {feildName}={value}`} <br />
                {`?{feildName}__ne={value}  mean {feildName}≠{value}`} <br />
                {`?{feildName}__gt={value} mean  {feildName}>{value}`} <br />
                {`?{feildName}__gte={value} mean   {feildName}≥{value}`} <br />
                {`?{feildName}__lt={value}  mean  {feildName}<;{value}`} <br />
                {`?{feildName}__lte={value}   {feildName}≤{value}`} <br />
              </span>
            </p>
          </div>
        </div>
        <div className='justify-center flex'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full rounded' src={filterData} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-32 ' >
        <div className='justify-center flex order-2'>
          <div className='text-left'>
            <p className='text-4xl text-blue1 font-bold text-center  md:text-left gradiantText'>React.js Example</p>
            <p className=' text-item mt-10 md:max-w-[80%] text-justify md:text-left sm:leading-9 '>
              This image demonstrates an example of how to use an API in React code.
            </p>
          </div>
        </div>
        <div className='justify-center flex order-1'>
          <div className='justify-center flex h-full w-full'>
            <div data-aos="fade-in" className=' w-full h-full text-center aspect-video'  >
              <img className='w-full h-full rounded' src={Example} alt="" />
            </div>
          </div>
        </div>
      </div>


      <footer className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Company Logo" className="h-8 bg-white rounded" />
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

export default Documentation