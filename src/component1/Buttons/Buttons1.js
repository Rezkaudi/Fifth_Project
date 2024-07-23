
function Buttons1(props) {
  return (
    <span>
      <button
        type="submit"
        style={{backgroundColor:"#006C84"}}
        className="flex bg-buttom1 px-3 py-1.5 rounded text-sm font-semibold leading-6 text-white shadow-sm hover:bg-buttom/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {props.name}
      </button>
    </span>
  )
}

export default Buttons1