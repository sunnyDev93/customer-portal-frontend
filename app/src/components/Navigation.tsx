import logo from '../images/logo_aptive.png';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-aptive-900 shadow-sm" x-data="{ open: false }">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img className="block h-8 w-auto" src={logo} alt="Aptive" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
