import welcome from "../assets/welcome.png";

function Hero() {
  return (
    <div className="w-full bg-black">
      <img
        src={welcome}
        alt="AAA Games"
        className="w-full h-[45vh] sm:h-[65vh] md:h-[80vh] lg:h-screen object-cover"
      />
    </div>
  );
}

export default Hero;