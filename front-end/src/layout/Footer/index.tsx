import { AiOutlineSmile } from "react-icons/ai";

interface NavbarProps {
  className?: string;
}

const Footer = ({ className }: NavbarProps) => {
  return (
    <nav className={`some-navbar-styles ${className}`}>
      <div className="flex h-20 text-lg justify-center items-center">
        All rights reserved &copy; {new Date().getFullYear()} <AiOutlineSmile />
      </div>
    </nav>
  );
};

export default Footer;
