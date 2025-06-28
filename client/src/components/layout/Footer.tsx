import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  ExternalLink,
  Heart,
  Zap,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative px-4 pt-16 pb-8 text-[#575c5f] 
  bg-gradient-to-br from-black/[0.80] to-[#1a1a1a] shadow-inner">

      <div >
        <div className="flex items-center gap-2">
          <Zap color="#575c5f" size={40} />

          <h1 className="font-bold text-xl sm:text-3xl  text-white/[0.5] ">Farhan-Apis</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  sm:justify-items-center sm:text-center lg:text-left
          text-[#575c5f] border-t border-white/10 pt-4 mt-4 px-10">

          {/* Quick Links */}
          <div className="relative ">
            <h3 className="text-2xl font-bold mb-6 pt-4 text-[#6150DA] ">Quick Links</h3>
            <ul className="space-y-3 list-none p-0 m-0 ">
              <li>
                <Link
                  to="/"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2
                   group-hover:mr-3 transition-all duration-300"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all
                   duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Privacy Policy
                </Link>
              </li>
            </ul>

          </div>

          {/* platform*/}
          <div className="relative">
            <div className="absolute -top-2 left-0 w-16 h-1 bg-saylani-green rounded-full"></div>
            <h3 className="text-2xl font-bold mb-6 pt-4 text-[#6150DA]">Platform</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <Link
                  to="/jobs/it"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/teaching"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Solution
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/admin"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms&Condition */}
          <div className="relative">
            <div className="absolute -top-2 left-0 w-16 h-1 bg-saylani-green rounded-full"></div>
            <h3 className="text-2xl font-bold mb-6 pt-4 text-[#6150DA]">Terms & Conditions</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <Link
                  to="/jobs/it"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Privacy Policiy
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/teaching"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/admin"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/admin"
                  className="text-[#575c5f] hover:text-saylani-green flex items-center transition-all duration-300 group"
                >
                  <div className="w-0 h-0 mr-0 bg-saylani-green rounded-full group-hover:w-2 group-hover:h-2 group-hover:mr-3 transition-all duration-300"></div>
                  License
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="relative">
            <div className="absolute -top-2 left-0 w-16 h-1 bg-saylani-green rounded-full"></div>
            <h3 className="text-2xl font-bold mb-6 pt-4 text-[#6150DA]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin
                  size={20}
                  className="mt-1 flex-shrink-0  text-[#01C852]"
                />
                <Link
                  to="https://maps.google.com/?q=Saylani+House+Bahadurabad+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#575c5f] group-hover:text-saylani-green transition-colors flex items-start"
                >
                  <span>Gulshan-e-Hadeed ,Malir, Karachi, Pakistan</span>
                  <ExternalLink
                    size={14}
                    className="ml-1 opacity-0 group-hover:opacity-100  transition-opacity"
                  />
                </Link>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone size={20} className="flex-shrink-0 text-[#01C852]" />
                <Link
                  to="tel:+921117295526"
                  className="text-[#575c5f] group-hover:text-saylani-green transition-colors"
                >
                  +92329232442
                </Link>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail size={20} className="flex-shrink-0 text-[#01C852]" />
                <Link
                  to={"mailto:info@saylanijobs.org"}
                  className="text-[#575c5f] group-hover:text-saylani-green transition-colors"
                >
                  farhansahabzada3@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-white/10 text-[#575c5f] mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} Farhan Sahibzada. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0 text-gray-300 flex items-center">
            <div className="flex space-x-3">
              <Link
                to="#"
                className="bg-opacity-10 p-2  rounded-full text-[#01C852] transition duration-300"
              >
                <Facebook size={18} />
              </Link>
              <Link
                to="#"
                className=" text-[#01C852] p-2  rounded-full transition duration-300"
              >
                <Linkedin size={18} />
              </Link>

              <Link
                to="#"
                className="text-[#01C852] p-2  rounded-full  transition duration-300"
              >
                <Twitter size={18} />
              </Link>
              <Link
                to="#"
                className="text-[#01C852] p-2 rounded-full  transition duration-300"
              >
                <Instagram size={18} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;