
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6">
      <div className="text-pet-orange font-bold text-2xl">PETISS</div>
      <div className="hidden md:flex gap-8">
        <Link to="/" className="font-medium">Home</Link>
        <Link to="/about" className="font-medium">About</Link>
        <Link to="/services" className="font-medium">Services</Link>
        <Link to="/price" className="font-medium">Price</Link>
        <Link to="/contact" className="font-medium">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
