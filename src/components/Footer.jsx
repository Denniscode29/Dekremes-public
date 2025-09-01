
 function Footer() {
  return (
   <footer className="bg-black text-white px-10 py-16 min-h-[350px]">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    {/* Left Section */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Title here</h3>
      <p className="text-sm leading-relaxed text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
        dignissim nunc, id maximus ex. Etiam nec dignissim elit, at dignissim
        enim.
      </p>
    </div>

    {/* About */}
    <div>
      <h4 className="text-white font-semibold mb-4">About</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">History</a></li>
        <li><a href="#" className="hover:text-white">Our Team</a></li>
        <li><a href="#" className="hover:text-white">Brand Guidelines</a></li>
        <li><a href="#" className="hover:text-white">Terms & Condition</a></li>
        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Services */}
    <div>
      <h4 className="text-white font-semibold mb-4">Services</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">How to Order</a></li>
        <li><a href="#" className="hover:text-white">Our Product</a></li>
        <li><a href="#" className="hover:text-white">Order Status</a></li>
        <li><a href="#" className="hover:text-white">Promo</a></li>
        <li><a href="#" className="hover:text-white">Payment Method</a></li>
      </ul>
    </div>

    {/* Other */}
    <div>
      <h4 className="text-white font-semibold mb-4">Other</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">Contact Us</a></li>
        <li><a href="#" className="hover:text-white">Help</a></li>
        <li><a href="#" className="hover:text-white">Privacy</a></li>
      </ul>
    </div>
  </div>
</footer>

  );
}
export default Footer;