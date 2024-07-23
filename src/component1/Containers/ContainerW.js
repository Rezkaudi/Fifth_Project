
function ContainerW(props) {
  return (
    <div className='grid grid-cols-4  gap-4 mt-8 pt-20 w-full bg-ice'style={{"marginBottom":"200px"}}>
        {props.children}
        </div>
    )
}

export default ContainerW