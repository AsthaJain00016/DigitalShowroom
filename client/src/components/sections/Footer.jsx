import {  Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="Footer" className="bg-gray-900 text-gray-300 px-6 md:px-16 py-10">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 🏷️ BRAND */}
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Vardhman Sarees
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Premium sarees, suits, blouses & many more. Visit our shop for the latest collection.
          </p>
        </div>

        {/* 🔗 LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>

          <ul className="flex flex-col gap-2">
            <li className="hover:text-white cursor-pointer"> <a href="#Home">Home</a> </li>
            <li className="hover:text-white cursor-pointer"><a href="#Collections">Collections</a></li>
            <li className="hover:text-white cursor-pointer"><a href="#Featured">Featured Collection</a></li>
            <li className="hover:text-white cursor-pointer"><a href="#Sale">Sale</a></li>
            <li className="hover:text-white cursor-pointer"><a href="#Contact">Contact</a></li>
          </ul>
        </div>

        {/* 📍 CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <p className="flex items-center gap-2">
              <MapPin size={16} />
              Dehradun, Uttarakhand
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16} />
              +91 9690473865
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} />
              vardhmansareessuits@gmail.com
            </p>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Vardhman Sarees, Suits and Blouses. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;