import { PiPopcornDuotone } from "react-icons/pi";

const Footer = () => {
    return (<footer className="bg-black h-48 flex flex-col justify-center items-center rounded-md">
        <PiPopcornDuotone className="text-yellow-300 text-6xl -rotate-12" />
        <p className="text-yellow-300 font-bold text-2xl">SIXiDES POPCORN TIME</p>
        <p className="text-gray-300 text-sm">Build by NextJS + TailwindCSS</p>
        <p className="text-gray-600 text-xs">SIXiDES Popcorn Time 2024 All Rights Reserved &copy;</p>
    </footer>)
}

export default Footer;