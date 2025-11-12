const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-black/10" style={{ backgroundColor: '#D3D3D3' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center text-black text-sm font-light">
          © {currentYear} Chitkul Lakshya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
