const Navbar = () => {
  return (
    <>
      <div className="flex justify-between bg-green-700 text-white py-2">
        <div className="logo cursor-pointer">
          <span className="font-bold text-xl mx-8 hover:text-gray-400 duration-1000">
            iTask
          </span>
        </div>
        <ul className="flex gap-8 mx-9">
          <li className="cursor-pointer hover:text-gray-400 duration-1000">
            Home
          </li>
          <li className="cursor-pointer hover:text-gray-400 duration-1000">
            Your Tasks
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
