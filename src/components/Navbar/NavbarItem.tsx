import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  to: string;
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ to, label }) => {
  return (
    <Link to={to} className="hover:underline">
      {label}
    </Link>
  );
};

export default NavbarItem;
