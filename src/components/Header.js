import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { menu, close, cart } from "ionicons/icons";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../firebase";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buyer, setBuyer] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (buyer) => {
      if (buyer) {
        setBuyer(buyer);
      }
    });
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        setBuyer(result.user);
        alert("Login successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = async () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        setBuyer(null);
        alert("Logout successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 h-20 shadow-md">
      <nav className="flex justify-between items-center w-[92%] mx-auto h-full">
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-wide text-gray-900"
          >
            Shopi
          </Link>
        </div>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-end md:w-auto w-full absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] duration-500 md:static px-5 h-full`}
        >
          <Link
            to="/myorders"
            className="block md:inline-block mt-4 md:mt-0 mr-6 hover:text-gray-500"
          >
            My Orders
          </Link>
          <Link
            to="/cart"
            className="block md:inline-block mt-4 md:mt-0 mr-6 hover:text-gray-500"
          >
            <IonIcon icon={cart} className="text-2xl mr-2 mt-1" />
          </Link>
          {buyer ? (
            <div className="relative">
              <img
                id="avatarButton"
                type="button"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={buyer.photoURL || "/path/to/default/avatar.jpg"}
                alt="User dropdown"
              />
              {dropdownOpen && (
                <div
                  id="userDropdown"
                  className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-10"
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{buyer.displayName}</div>
                    <div className="font-medium truncate">{buyer.email}</div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="block md:inline-block bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-[#87acec]"
              onClick={handleLogin}
            >
              Log In
            </button>
          )}
        </div>
        <IonIcon
          icon={menuOpen ? close : menu}
          className="text-3xl cursor-pointer md:hidden"
          onClick={handleToggleMenu}
        />
      </nav>
    </header>
  );
};

export default Header;
