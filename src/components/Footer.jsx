
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 pb-4 text-center relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="border-t border-primary/30 pt-4 text-xs text-primary/70">
          <div className="mb-2">
            <a href="#" className="text-primary hover:underline hover:text-primary">Guidelines</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">FAQ</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">Lists</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">API</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">Security</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">Legal</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">Apply to YC</a> | 
            <a href="#" className="text-primary hover:underline hover:text-primary ml-1">Contact</a>
          </div>
          <div>
            <form className="inline-block">
              <label className="mr-1 text-primary">Search:</label>
              <input type="text" className="bg-black border border-primary/50 px-1 py-0.5 text-xs w-40 text-primary" />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
