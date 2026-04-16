import { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 px-4 md:px-6 py-3 flex justify-between items-center transition duration-500 ${
        show ? "bg-black" : "bg-transparent"
      }`}
    >
      <h1 className="text-red-600 text-xl md:text-2xl font-bold">
        NETFLIX
      </h1>
    </div>
  );
};

export default Navbar;