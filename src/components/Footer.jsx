
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 pb-4 text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="border-t border-gray-300 pt-4 text-xs text-gray-500">
          <div className="mb-2">
            <a href="#" className="text-gray-500 hover:underline">Guidelines</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">FAQ</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">Lists</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">API</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">Security</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">Legal</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">Apply to YC</a> | 
            <a href="#" className="text-gray-500 hover:underline ml-1">Contact</a>
          </div>
          <div>
            <form className="inline-block">
              <label className="mr-1">Search:</label>
              <input type="text" className="border border-gray-300 px-1 py-0.5 text-xs w-40" />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
