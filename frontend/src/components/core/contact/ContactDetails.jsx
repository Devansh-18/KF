import React from "react";
import { FaInstagram, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";
import { Link } from "react-router-dom";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "devanshdubey54321@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Kannauj , U.P.",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri (9:00 A.M. - 6:00 P.M.)",
    details: "+91 8299728913",
  },
];

const socialLinks = [
  {
    icon: FaInstagram,
    link: "https://www.instagram.com",
  },
  {
    icon: FaFacebookSquare,
    link: "https://www.facebook.com/anoop.dubey.391",
  },
  {
    icon: FiYoutube,
    link: "https://www.youtube.com",
  },
  {
    icon: FaTwitter,
    link: "https://www.twitter.com",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-purple-200 p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div
            className="flex flex-col gap-2 p-3 text-sm text-gray-700 border-b last:border-none"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} className="text-orange-500" />
              <h1 className="text-lg font-semibold text-gray-900">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium text-gray-600">{ele?.description}</p>
            <p className="font-semibold text-gray-800">{ele?.details}</p>
          </div>
        );
      })}

      <div className="mt-6 flex space-x-4 justify-center">
        {socialLinks.map((social, index) => (
          <Link
            to={social.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <social.icon className="p-2 bg-white text-4xl rounded-full hover:scale-110 duration-200 hover:bg-blue-200" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
