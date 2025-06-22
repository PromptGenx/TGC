import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Offerings", href: "/offerings", current: false },
  { name: "Membership Registration", href: "/membership-home", current: false },
  { name: "About Us", href: "/about", current: false },
  { name: "Contact Us", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Disclosure
      as="nav"
      className="bg-white mt-0 shadow-[0_8px_15px_-5px_rgba(0,0,0,0.3)]"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-10">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex justify-center sm:justify-start flex-1 mt-10">
            <div className="flex justify-center shrink-0 items-center bg-white p-1 rounded-full shadow-[0_8px_15px_-5px_rgba(0,0,0,0.3)]">
              <img src={Logo} alt="tgc-logo" className="h-16 w-auto" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:block">
            <ul className="flex space-x-8">
              {navigation.map((item) => (
                <li
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="px-4 py-2 text-[16px] font-sans font-semibold text-gray-700 hover:text-gray-900 cursor-pointer transition duration-200"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
