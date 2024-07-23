function ContainerB(props) {
  return (
    <div className='w-full bg-buttom1'>
    <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 px-10 py-32 justify-items-center items-center'>
      {props.children}
    </div>
  </div>
  );
}

export default ContainerB;
