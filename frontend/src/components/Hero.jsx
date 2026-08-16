import welcome from "../assets/welcome.png";

function Hero() {
  return (
    

    
    <div className="w-full bg-black">
      <img
        src={welcome}
        alt="AAA Games"
        className="w-full h-screen object-cover"
      />
    
    </div>
  );
}

export default Hero;