function ContainerB(props) {
  return (
    <div className={`w-full bg-buttom1 ${props.classname}`}>
    <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10 sm:pt-44 pb-4 px-10 justify-items-center items-start'>
      {props.children}
    </div>
  </div>
  );
}

export default ContainerB;
