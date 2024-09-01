function Card({ props }) {
  console.log(props);
  const {
    profPic,
    driver,
    date,
    departureTime,
    returnTime,
    days,
    trajectory,
    carModel,
    carPictures,
    description,
    phone,
  } = props;

  return (
    <div className="w-full md:w-[800px] h-auto mb-8 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <div className="flex flex-col justify-between  md:flex-row gap-4 md:gap-12 items-start mb-6">
        <div className="flex items-center gap-4">
          <img className="rounded-full w-16 h-16 object-cover" src={profPic} alt="Driver" />
          <div>
            <h2 className="text-lg font-bold">{driver}</h2>
            <p className="text-gray-600">{days} | {date}</p>
            <p className="text-gray-600">{departureTime} - {returnTime}</p>
          </div>
        </div>
        <img className="w-32 h-32 object-cover rounded-lg" src={carPictures.length ? carPictures[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklEceyBw6oFsRY7JizfUaAuwx989EvQfI5g&s"} alt="Car" />
      </div>
      <div className="mb-6">
        <h4 className="text-gray-600 font-semibold">Trajectory:</h4>
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-gray-600 mb-4 md:mb-0">{description}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Contact: {phone}
        </button>
      </div>
    </div>
  );
}

export default Card;
