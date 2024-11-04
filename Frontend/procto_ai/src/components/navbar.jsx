import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a className="text-2xl font-bold text-blue-600 bg-white px- py-1 rounded" href="#">
              Procto 
            <span className="bg-blue-600 text-white rounded-md p-2 m-1">AI</span>
            </a>
            <button className="navbar-toggler lg:hidden" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="hidden lg:flex space-x-4" id="navbarNav">
              <ul className="flex space-x-4">
                <li>
                  <a className="text-gray-700 hover:text-blue-600" href="#">Home</a>
                </li>
                <li>
                  <a className="text-gray-700 hover:text-blue-600" href="#">About</a>
                </li>
                <li>
                  <a className="text-gray-700 hover:text-blue-600" href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
