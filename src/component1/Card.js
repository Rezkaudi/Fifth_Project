
function Card(props) {
  return (
    <div className='text-center Card max-w-64 w-full pb-8 ' >
      <h1 className='text-center font-bold text-white Card-title text-2xl'>{props.name}</h1>
      <p className='text-center text-white Card-body'>{props.content}</p>
    </div>
  )
}

export default Card