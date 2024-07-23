import './Tokens.css'
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CopyIcon from "../../assets/images/copy-duplicate-c2.svg"
import { creatUserToken, getUserTokens } from '../../features/user/handleRequests';

const Tokens = () => {

  const dispatch = useDispatch()
  const { userTokens, loading } = useSelector(state => state.user)
  const [checkboxState, setCheckboxState] = useState({
    read_P: "true",
    write_P: "true",
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


  const formData = useMemo(() => {
    const data = new FormData();
    // Convert boolean to string, capitalize the first letter, and append
    data.append('read_P', capitalizeFirstLetter(checkboxState.read_P.toString()));
    data.append('write_P', capitalizeFirstLetter(checkboxState.write_P.toString()));
    return data;
  }, [checkboxState.read_P, checkboxState.write_P]); // Recompute formData only if these values change



  const handleCopy = (x) => {
    navigator.clipboard.writeText(x).then(() => {
      alert('Text copied successful');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxState(prev => ({
      ...prev,
      [name]: checked.toString(),
    }));
    formData.set(name, capitalizeFirstLetter(checked.toString()))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(...formData.entries());
    dispatch(creatUserToken(formData)).unwrap().then(
      () => {
        dispatch(getUserTokens())
      },
      (error) => {
        console.error("Failed to sign in:", error);
      }
    );

  };

  return (
    <main className="grid flex-1 h-[calc(100vh-8px)] place-items-center pl-8 py-24 sm:py-32  bg-c4 rounded">

      <div className="flex items-start space-y-5 justify-start flex-col">
        {userTokens ? userTokens.map((item, index) =>
          <div key={index} className='flex items-center space-x-2 justify-center'>
            <div className='flex items-start space-y-1 justify-center flex-col text-sm'>
              <span>Read {item.Read.toString()}</span>
              <span>write {item.Write.toString()}</span>
            </div>
            <span className="inline-block rounded text-lg w-60 overflow-hidden bg-gray-200 p-2">{item.token}</span>
            <button onClick={() => handleCopy(`Token ${item.token}`)} className="cursor-pointer">
              <img src={CopyIcon} alt="copy " />
            </button>
          </div>
        ) :
          <span>loading ...</span>
        }
      </div>

      <form onSubmit={handleSubmit} className="space-x-4 flex items-center justify-between">
        <div>
          <label>
            <input
              type="checkbox"
              name="read_P"
              checked={checkboxState.read_P === "true" ? true : false}
              onChange={handleChange}
              className="mr-2"
            />
            Read
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="write_P"
              checked={checkboxState.write_P === "true" ? true : false}
              onChange={handleChange}
              className="mr-2"
            />
            Write
          </label>
        </div>

        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Token
          {loading && (
            <span
              className="animate-spin h-5 ml-2 w-5 border-t-2 border-b-2 border-c4 rounded-full inline-block"
              role="status"
              aria-live="polite"
            ></span>
          )}
        </button>
      </form>

    </main>
  )
}

export default Tokens