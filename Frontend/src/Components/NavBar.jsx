
import logo from "../assets/Black White Modern Monogram CR Logo Design.svg";

function Navbar(){
    return(
        <nav className="border-b border-white/10 h-16 flex items-center px-6">
            <img src={logo} alt="logo" className="w-auto h-40" />
        </nav>
    );
}

export default Navbar;