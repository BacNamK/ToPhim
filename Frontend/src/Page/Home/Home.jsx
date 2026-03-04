import BgImage from "../../image/ImageTest1.jpg";

const Home = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BgImage})` }}
        />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_250px_#191B24]" />
        {/* Fade xuống dưới */}
        <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-[#191B24] to-transparent" />
      </div>
      {/* */}
      <div className="w-full h-screen bg-[#191B24] p-5">
        <div className="w-full h-full bg-gray-50/5 rounded-md shadow"></div>
      </div>
    </>
  );
};

export default Home;
