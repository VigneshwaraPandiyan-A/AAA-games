import { Link } from "react-router-dom";

function About() {
  const stats = [
    { label: "Active Gamers", value: "100K+" },
    { label: "AAA Game Titles", value: "500+" },
    { label: "Instant Key Delivery", value: "99.9%" },
    { label: "Customer Support", value: "24/7" },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Instant Digital Delivery",
      description:
        "Get your game keys delivered directly to your email and order page immediately after checkout.",
    },
    {
      icon: "🛡️",
      title: "100% Genuine Keys",
      description:
        "All our game licenses are sourced directly from official publishers and authorized distributors.",
    },
    {
      icon: "🎮",
      title: "Multi-Platform Support",
      description:
        "Whether you game on PC, PS5, Xbox Series X, or Steam Deck, we've got you covered.",
    },
    {
      icon: "💎",
      title: "Best Price Guarantee",
      description:
        "Enjoy competitive pricing, exclusive seasonal discounts, and rewards on every purchase.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-zinc-950 text-white">
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <span className="bg-purple-600/30 text-purple-400 border border-purple-500/50 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
          Welcome to AAA Games
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold mt-6 bg-linear-to-r from-white via-purple-300 to-purple-500 bg-clip-text text-transparent leading-tight">
          Your Ultimate Destination for Next-Gen Gaming
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
          At AAA Games, we are passionate gamers dedicated to bringing you the latest blockbusters, indie gems, and timeless classics at unbeatable prices with zero wait time.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-bold transition shadow-lg hover:shadow-purple-500/30 text-center"
          >
            Explore Games
          </Link>
          <Link
            to="/contact"
            className="border border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-3.5 rounded-xl font-bold transition text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="border-y border-purple-900/50 bg-black/50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400">
                {stat.value}
              </h2>
              <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Why Gamers Choose Us
        </h2>
        <p className="text-gray-400 text-center max-w-xl mx-auto mb-14">
          We combine cutting-edge security with instant digital delivery to offer an unrivaled gaming retail experience.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/80 border border-purple-800/40 hover:border-purple-500 p-8 rounded-2xl transition duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION & COMMUNITY */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-linear-to-r from-purple-900/40 via-zinc-900 to-purple-900/40 border border-purple-700/50 rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Built by Gamers, for Gamers 🎮
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Founded in 2026, AAA Games was created with a single mission: to eliminate overpriced digital games and slow delivery. We partner directly with creators and authorized distributors to pass maximum savings onto the global gaming community.
          </p>
          <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-300 border border-purple-500/40 px-6 py-3 rounded-full font-semibold">
            <span>Ready to upgrade your library?</span>
            <Link to="/" className="text-white underline font-bold hover:text-purple-400">
              Browse Store →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
