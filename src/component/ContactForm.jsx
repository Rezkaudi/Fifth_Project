import React from 'react';
import Contact from "../assets/images/undraw_personal_text_re_vqj3.svg"

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <section className="flex flex-col md:flex-row items-start justify-center py-16 px-10 bg-c1">
      {/* Image on the left, hidden on mobile screens */}
      <div className="hidden md:block md:w-1/2">
        <img src={Contact} alt="Contact Us" data-aos="fade-right" className="w-full h-auto md:rounded-lg" /> {/* Adjust the path to your image */}
      </div>

      {/* Form on the right, full width on mobile and half width on larger screens */}
      <form onSubmit={handleSubmit} className=" md:w-1/2 px-4 pt-0 space-y-7  md:rounded-lg">
        <h2 className="text-3xl font-black text-center text-white pb-10">Contact Us</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-c1"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-c1"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-c1"
          rows="4"
          required
        />
        <button
          type="submit"
          style={{ backgroundColor: "#fff" }}
          className="w-full py-2 text-c1 rounded transition duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactForm;