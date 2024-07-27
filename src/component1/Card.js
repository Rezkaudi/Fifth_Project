function Card(props) {
  return (
    <div className="text-center w-full py-8 rounded card "
    data-aos="fade-in">     
      <h1 className="flex items-center justify-center font-bold text-white Card-title text-2xl  ">
        {props.name}
      </h1>
      <p className="text-justify text-white md:px-5 pt-10">{props.content}</p>
    </div>
  );
}

export default Card;
