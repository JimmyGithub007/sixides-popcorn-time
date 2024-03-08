import { PiPopcornDuotone } from "react-icons/pi";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion"

const Footer = () => {
    return (<motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black h-28 md:h-48 flex flex-col justify-center items-center">
        <PiPopcornDuotone className="text-yellow-300 text-3xl md:text-6xl -rotate-12" />
        <p className="text-yellow-300 font-bold text-md md:text-2xl">SIXiDES POPCORN TIME</p>
        <div className="flex items-center text-gray-300 text-xs md:text-sm gap-2">Build by NextJS <SiNextdotjs /> + TailwindCSS <SiTailwindcss /></div>
        <p className="text-gray-600 text-[0.6rem] md:text-xs">SIXiDES Popcorn Time 2024 All Rights Reserved &copy;</p>
    </motion.div>)
}

export default Footer;