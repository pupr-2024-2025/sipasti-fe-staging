import { motion } from "framer-motion";
import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";
import PuprLogo from "../../public/images/pu-logo.svg";
import SipastiLogo from "../../public/images/sipasti-logo.svg";
import LoginImage from "../../public/images/login-asset.svg";

export default function LoginPage() {
  return (
    <div className="relative flex justify-center items-center h-screen gap-8 mx-4 md:gap-12 lg:gap-16">
      <div className="flex flex-col justify-between w-full max-w-[900px] h-full p-8 mx-auto">
        <div className="flex justify-between">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}>
            <Image
              src={PuprLogo}
              alt="PUPR Logo"
              className="max-h-[54.37px] max-w-[156px]"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}>
            <Image
              src={SipastiLogo}
              alt="Sipasti Logo"
              className="max-h-[54px] max-w-[201px]"
            />
          </motion.div>
        </div>

        <LoginForm />
        <div className="flex flex-row justify-between items-center">
          <p className="text-B2 text-neutral-500">
            2024© SIPASTI V.3.0 All Reserved by PUPR
          </p>
          <div className="gap-x-2 flex items-center">
            <button className="text-blue-600 text-sm">Kebijakan Privasi</button>
            <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
              <circle cx="2" cy="2" r="2" fill="#B3B3B3" />
            </svg>
            <button className="text-blue-600 text-sm">
              Syarat dan Ketentuan
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block max-h-[960px] max-w-[688px]">
        <motion.div
          whileHover={{
            scale: 1.02,
            y: [-2, 2, -2],
          }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.6,
          }}>
          <Image src={LoginImage} alt="Login Image" className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}
