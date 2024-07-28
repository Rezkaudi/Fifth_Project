
function Buttons1(props) {
  return (
    <span>
      <button
        className="flex px-3 py-1.5 rounded text-sm font-semibold leading-6 text-white shadow-sm gradiantBg">
        {props.name}
      </button>
    </span>
  )
}

export default Buttons1