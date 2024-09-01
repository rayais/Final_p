function Card({ props }) {
  console.log(props)
  const { driver, carmodel, phone, carPictures, trajectory, Desc } = props;

  return (
    <div className="w-full md:w-[800px] h-[250px] mb-8 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <div className="flex gap-12 items-center mb-6">
        <img className="rounded-full w-12 h-12 object-cover" src={carPictures.length ?carPictures[0]:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklEceyBw6oFsRY7JizfUaAuwx989EvQfI5g&s"} alt="" />
        <h2 className="text-lg font-bold">{driver} 1</h2>
      </div>
      <div className="mb-6">
        <h4 className="text-gray-600">Trajectory:</h4>
        <ul className="list-none mb-0">
          {trajectory.map((cit, index) => (
            <li key={index} className="inline-block mr-2">
              {cit.city}
              
              {index < trajectory.length - 1 && (
                <span className="text-gray-400"> | </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-600">{Desc}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Contact: {phone}
        </button>
      </div>
    </div>
  );
}
export default Card;