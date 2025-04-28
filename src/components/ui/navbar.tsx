import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../../../public/images/logo.svg";
import { User } from "iconsax-react";
import colors from "@/styles/colors";
import CustomAlert from "./alert";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (index: number) => {
    clearTimeout(hoverTimeout);
    setHovered(index);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHovered(null);
    }, 300);
  };

  const handleProfileMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsProfileHovered(true);
  };

  const handleProfileMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsProfileHovered(false);
    }, 300);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    console.log("🧠 Username from localStorage:", storedUsername);
    console.log("🔐 Role from localStorage:", storedRole);

    if (storedUsername) {
      const cleanUsername = storedUsername.replace(/@gmail\.com$/i, "");
      setUsername(cleanUsername);
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const allLinks = [
    {
      href: "/dashboard",
      label: "Beranda",
      roles: [
        "superadmin",
        "Tim Teknis Balai",
        "PJ Balai",
        "Petugas Lapangan",
        "Koordinator Provinsi",
        "Pengolah Data",
        "Pengawas",
      ],
    },
    {
      href: "",
      label: "Perencanaan Data",
      activePath: "/perencanaan_data",
      roles: ["superadmin", "Tim Teknis Balai"],
    },
    {
      href: "/pengumpulan_data/informasi_tahap_pengumpulan",
      label: "Pengumpulan Data",
      activePath: "/pengumpulan_data",
      roles: ["superadmin", "Petugas Lapangan", "Pengolah Data", "Pengawas"],
    },
    {
      href: "/pemeriksaan_data/informasi_pemeriksaan_data",
      label: "Pemeriksaan",
      activePath: "/pemeriksaan_data",
      roles: ["superadmin", "Koordinator Provinsi", "Tim Teknis Balai"],
    },
    {
      href: "/inputvendor",
      label: "Responden/Vendor",
      activePath: "/vendor",
      roles: ["superadmin", "Tim Teknis Balai"],
    },
    {
      href: "",
      label: "Monitoring",
      activePath: "/pj_balai",
      roles: ["superadmin", "PJ Balai"],
    },
    {
      href: "/user_role/user_role",
      label: "Assign User",
      activePath: "/user_role",
      roles: ["superadmin"],
    },
  ];

  const links = allLinks.filter((link) => link.roles.includes(role));

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <CustomAlert
        message={alertMessage}
        severity="error"
        openInitially={alertOpen}
        onClose={() => setAlertOpen(false)}
      />

      <nav
        className={`relative flex items-center ${
          isSticky ? "sticky" : "relative"
        } pt-6 px-6`}>
        {/* Logo Container */}
        <div className="absolute left-6">
          <Link
            href="/dashboard"
            className="bg-custom-blue-500 flex items-center rounded-full py-6 px-7 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95">
            <Image
              src={logo}
              alt="SIPASTI Logo"
              className={`max-h-[54.37px] max-w-[156px] transition-transform duration-300 ease-in-out ${
                links.some((link) =>
                  router.pathname.startsWith(link.activePath || link.href)
                )
                  ? "scale-110"
                  : "scale-100"
              }`}
            />
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="mx-auto bg-custom-neutral-100 rounded-full">
          <ul className="inline-flex flex-row items-center gap-x-3 px-2 h-[66px]">
            {links.map((link, index) => {
              const isActive = router.pathname.startsWith(
                link.activePath || link.href
              );
              const isHovered = hovered === index;

              return (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}>
                    <Link
                      href={link.href}
                      className={`py-4 px-4
                        ${
                          isActive
                            ? "text-emphasis-on_color-high text-H6"
                            : "text-emphasis-on_surface-medium text-B1"
                        } 
                        leading-none rounded-full transition-all duration-300 ease-in-out
                        ${isActive ? "bg-custom-blue-500" : ""} 
                        ${
                          isHovered
                            ? "hover:bg-surface-light-overlay active:bg-custom-neutral-300"
                            : ""
                        }`}>
                      {link.label}
                    </Link>
                  </motion.div>

                  {/* Submenu for Perencanaan Data */}
                  {link.label === "Perencanaan Data" && isHovered && (
                    <div
                      className="absolute left-0 mt-[32px] w-56 bg-white rounded-[12px] shadow-lg p-2 z-50"
                      style={{
                        boxShadow: "0px 4px 16px 0px rgba(165, 163, 174, 0.45)",
                      }}>
                      {[
                        {
                          href: "/perencanaan_data/tahap1",
                          label: "Buat Baru",
                        },
                        {
                          href: "/perencanaan_data/perencanaan_data_list",
                          label: "Informasi Perencanaan Data",
                        },
                      ].map((submenuItem, submenuIndex) => (
                        <Link
                          key={submenuIndex}
                          href={submenuItem.href}
                          className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200">
                          {submenuItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Profile Container */}
        <div
          className="absolute right-6"
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}>
          {/* Profile Button */}
          <div className="bg-custom-neutral-100 flex items-center rounded-full px-3 pe-6 h-[66px] space-x-3 cursor-pointer">
            <div className="p-2 bg-custom-neutral-0 rounded-full">
              <User
                color={colors.Emphasis.Light.On_Surface.High}
                variant="Linear"
                size={24}
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <span className="text-emphasis-on_surface-high text-ExtraSmall">
                {role || "Role tidak tersedia"}
              </span>
              <span className="text-emphasis-on_surface-high text-H6">
                {username || "Pengguna"}
              </span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isProfileHovered && (
            <div className="absolute right-0 mt-2 w-[256.41px] bg-white rounded-xl shadow-lg flex flex-col space-y-2 p-3 z-50">
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: "#f0f4ff" }}
                transition={{ duration: 0.2 }}
                className="block px-4 py-2 text-sm text-emphasis-on_surface-high rounded-[12px] cursor-not-allowed opacity-50 select-none pointer-events-none">
                Pengaturan Akun
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#ffe5e5" }}
                transition={{ duration: 0.2 }}
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-custom-red-500 rounded-[12px] hover:bg-custom-red-50">
                Keluar
              </motion.button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
