
function ContainerW(props) {
  return (
    <div className='flex items-start justify-around px-10 gap-4 mt-8 pt-20 w-full bg-ice '>
        {props.children}
        </div>
    )
}

export default ContainerW