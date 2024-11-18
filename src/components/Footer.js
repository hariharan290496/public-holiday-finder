import React from "react";

function Footer() {
  return (
    <footer className="text-center py-4 bg-gray-200">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Public Holiday Finder
      </p>
    </footer>
  );
}

export default Footer;
