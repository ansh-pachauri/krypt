import { HiMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { useState } from "react";
import logo from "../../images/logo.png";

const NavbarItems = ({ title, classprops }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classprops}`}>
            {title}
        </li>
    )
}

export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            
            {/* Desktop Menu */}
            <ul className="text-white md:flex hidden list-none flex-row justify-end items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
                    return (
                        <NavbarItems key={item + index} title={item} classprops="my-2 text-lg" />
                    )
                })}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="flex relative md:hidden">
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(true)} />
                }
            </div>

            {/* Mobile Menu */}
            {toggleMenu && (
                <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                    <li className="text-xl w-full my-2">
                        <AiOutlineClose onClick={() => setToggleMenu(false)} />
                    </li>
                    {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
                        return (
                            <NavbarItems key={item + index} title={item} classprops="my-2 text-lg" />
                        )
                    })}
                    <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        Login
                    </li>
                </ul>
            )}
        </nav>
    )
}