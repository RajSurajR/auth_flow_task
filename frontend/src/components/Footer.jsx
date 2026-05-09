const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200  pb-8">
      <div className="max-w-6xl mx-auto px-8">


        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-800">
            © {currentYear} PrimeTrade Security Systems. Built for Portfolio Demonstration.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a className="hover:text-slate-900 transition-colors cursor-pointer">Privacy Policy</a>
            <a  className="hover:text-slate-900 transition-colors cursor-pointer">Terms of Service</a>
            <a  className="hover:text-slate-900 transition-colors cursor-pointer">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;