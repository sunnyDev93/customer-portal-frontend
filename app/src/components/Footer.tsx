import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pl-[24px] pr-[24px] flex justify-between md:justify-start mt-auto bg-white border-t border-gray-300 text-xs py-3 md:px-10 space-x-12 md:pl-[60px]">
      <div className="text-xs">
        Copyright &copy; {new Date().getFullYear()} Aptive <br className="md:hidden" />
        Environmental
      </div>
      <a data-testid="link" href="https://goaptive.com/privacy-policy" className="font-medium" target="_blank" rel="noreferrer">
        Privacy <br className="md:hidden" />
        Policy
      </a>
    </footer>
  );
};

export default Footer;
