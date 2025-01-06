"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsMobile(true);
      } else {
        setIsCollapsed(false);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full relative">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-900 text-white p-4 transition-all duration-300 h-full overflow-hidden z-30 ${
          isMobile ? "absolute top-0 left-0 h-full" : "relative"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Dashboard
          </h2>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center hover:text-gray-400"
            >
              <RiDashboardHorizontalFill className="inline text-xl" />
              <span
                className={`ml-2 transition-opacity ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                Overview
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/history"
              className="flex items-center hover:text-gray-400"
            >
              <LuHistory className="inline text-xl" />
              <span
                className={`ml-2 transition-opacity ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                History
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center hover:text-gray-400"
            >
              <CiSettings className="inline text-xl" />
              <span
                className={`ml-2 transition-opacity ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
