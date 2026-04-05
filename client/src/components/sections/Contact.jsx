import { useState } from "react";
import api from "../../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      setStatus("Please fill in all fields");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      // Send email via backend
      await api.post("/contact/send-email", {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        recipientEmail: "vardhmansarees@gmail.com",
      });

      // Send WhatsApp message
      const whatsappMessage = `Hello, I'm ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;
      const whatsappUrl = `https://wa.me/919690473865?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");

      setStatus("Message sent successfully! WhatsApp will open in a new tab.");
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      const message = error?.response?.data?.message || error?.message || "Failed to send message. Please try again.";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Contact" className="py-12 px-4 md:px-10 bg-white">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-10">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-10">

        {/* 📝 FORM */}
        <div className="flex-1">

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />

            <textarea
              rows="4"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-800 hover:bg-red-900 text-white py-3 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <div className={`p-3 rounded-md text-center ${status.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {status}
              </div>
            )}

          </form>

        </div>

        {/* 📍 INFO */}
        <div className="flex-1 text-center md:text-left">

          <h3 className="text-xl font-semibold text-gray-800">
            Get in Touch
          </h3>

          <p className="mt-4 text-gray-600">
            Visit our shop for the latest collection of sarees, suits and blouses.
          </p>

          <p className="mt-4 text-gray-700 font-medium">
            📍 21 Jhanda Bazar, Dehradun
          </p>

          <p className="mt-2 text-gray-700 font-medium">
            📞 +91 9690473865
          </p>

          <p className="mt-2 text-gray-700 font-medium">
            ✉️ vardhmansareessuits@gmail.com
          </p>

        </div>

      </div>
    </section>
  );
};

export default Contact;