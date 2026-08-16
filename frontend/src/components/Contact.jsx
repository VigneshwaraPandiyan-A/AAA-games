import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Support",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "Order Support",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: "✉️",
      title: "Email Support",
      detail: "support@aaagames.com",
      subText: "Average response within 2 hours",
    },
    {
      icon: "💬",
      title: "Discord Community",
      detail: "discord.gg/aaagames",
      subText: "Join 50K+ gamers for instant help",
    },
    {
      icon: "📍",
      title: "Headquarters",
      detail: "AAA Games Studio Inc.",
      subText: "Silicon Valley, California, USA",
    },
  ];

  const faqs = [
    {
      q: "How fast will I receive my game key?",
      a: "Keys are delivered instantly to your email and visible under 'My Orders' immediately after successful payment.",
    },
    {
      q: "What if a key doesn't work?",
      a: "Our 24/7 support team will verify and issue a replacement key or full refund within minutes.",
    },
    {
      q: "Which payment methods are accepted?",
      a: "We support Credit/Debit Cards, UPI, Net Banking, Google Pay, and Cash on Delivery.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-zinc-950 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="bg-purple-600/30 text-purple-400 border border-purple-500/50 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
            Contact Support
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 bg-linear-to-r from-white via-purple-300 to-purple-500 bg-clip-text text-transparent">
            Get in Touch with HQ
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Have questions about an order, game compatibility, or store partnerships? Our gamer support squad is here 24/7.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/90 border border-purple-800/40 p-8 rounded-2xl text-center shadow-lg hover:border-purple-500 transition duration-300"
            >
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {info.title}
              </h3>
              <p className="text-purple-400 font-semibold">{info.detail}</p>
              <p className="text-gray-400 text-sm mt-1">{info.subText}</p>
            </div>
          ))}
        </div>

        {/* FORM AND FAQ SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* CONTACT FORM */}
          <div className="bg-zinc-900 border border-purple-700/60 rounded-3xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-900/30 border border-green-500 text-green-300 p-6 rounded-2xl text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                <p className="text-gray-300">
                  Thank you for reaching out. A support specialist will respond to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 rounded-xl bg-black/60 border border-gray-700 text-white focus:border-purple-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 rounded-xl bg-black/60 border border-gray-700 text-white focus:border-purple-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-black/60 border border-gray-700 text-white focus:border-purple-500 outline-none transition"
                  >
                    <option>Order Support</option>
                    <option>Game Key Assistance</option>
                    <option>Payment & Refund</option>
                    <option>Partnership & Press</option>
                    <option>General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 rounded-xl bg-black/60 border border-gray-700 text-white focus:border-purple-500 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-purple-500/30"
                >
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>

          {/* FAQ ACCORDION */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>

            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/80 border border-purple-800/40 p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-purple-300 mb-2">
                  ❓ {faq.q}
                </h3>
                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}

            <div className="bg-purple-950/40 border border-purple-700/50 p-6 rounded-2xl text-center mt-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Need Live Assistance?
              </h3>
              <p className="text-gray-400 mb-4">
                Chat directly with our team on Discord for real-time support.
              </p>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition"
              >
                Join Discord Channel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
