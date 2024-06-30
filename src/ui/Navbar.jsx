import React from "react";

import avatar from "../Assets/images/avatar.png";
import av1 from "../Assets/images/av1.png";
import av2 from "../Assets/images/av2.png";
import logo from "../Assets/images/logo.svg";
import axios from "./../utils/axios";
import Dropdown from "react-bootstrap/Dropdown";
import i18next from "i18next";
import "../Assets/styles/dropdownes.css";
import { Link } from "react-router-dom";
import { IconLanguage } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/slices/language";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authedUser.user);
  const lang = useSelector((state) => state.language.lang);
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  console.log(user);

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    axios.defaults.headers.common["lang"] = newLang;
    document.querySelector("body").classList.toggle("en", newLang === "en");
  };

  return (
    <header>
      <nav className="tnavbar">
        <div className="toogler">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="small-media-menu">
          <div className="user">
            <Link to="/profile" className="avatar">
              <img src={user?.image} alt="" />
            </Link>
            <div className="userr">
              <h6>{user?.name}</h6>
              <span>بائع مميز</span>
            </div>
          </div>
        </div>

        <div className="right-wrapper">
          <div className="logo d-block">
            <Link to="/">
              <img className="brand" src={logo} alt="logo" />
            </Link>
          </div>
          <ul className="nav-links">
            {isLogged && (
              <li className="nav-link">
                <Link to="/services">
                  <i className="far fa-plus"></i> {t("navbar.addService")}
                </Link>
              </li>
            )}
            <li className="nav-link">
              <Link to="/categories">
                <i className="far fa-cube"></i> {t("navbar.departments")}
              </Link>
            </li>
            {isLogged && (
              <>
                <li className="nav-link">
                  <Link to="/purchases">
                    <i className="far fa-shopping-bag"></i> المشتريات
                  </Link>
                  <span className="num-count2">3</span>
                </li>
                <li className="nav-link">
                  <Link to="/recieved-request">
                    <i className="far fa-clipboard-list-check"></i> الطلبات
                    الواردة
                  </Link>
                  <span className="num-count2">2</span>
                </li>
                <li className="nav-link">
                  <Link to="/requests">
                    <i className="far fa-hand-point-up"></i> اطلب خدمة علي زوقك
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="left-wrapper">
          <ul className="loged-in-minor-menu">
            {/* search*/}
            <li className="link">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "#f4f4f4" }}
                  id="dropdown-basic"
                >
                  <i className="fa-regular fa-magnifying-glass"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="dropItem">
                    <form action="/search" aria-labelledby="searchmenu">
                      <input
                        className="Search_input"
                        type="text"
                        placeholder="ابحث عن..."
                      />
                    </form>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="link">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "#f4f4f4" }}
                  id="dropdown-basic"
                >
                  <IconLanguage stroke={1} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item>
                    <div
                      className="dropdown-item"
                      onClick={() => handleLang("ar")}
                    >
                      <div
                        className={`${
                          lang === "ar" ? "circle-filled" : "circle-outline"
                        }`}
                      ></div>
                      عربى
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div
                      className="dropdown-item"
                      onClick={() => handleLang("en")}
                    >
                      <div
                        className={`${
                          lang === "en" ? "circle-filled" : "circle-outline"
                        }`}
                      ></div>
                      English
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            {isLogged && (
              <>
                {/*Cart*/}
                <li className="link hide-sm2">
                  <Link to="/cart" className="cart btn">
                    <i className="fa-light fa-cart-shopping"></i>
                    <span className="num-count">1</span>
                  </Link>
                </li>

                {/*messsage*/}
                <li className="link hide-sm2">
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ backgroundColor: "#f4f4f4" }}
                      id="dropdown-basic"
                    >
                      <i className="fa-regular fa-message-lines"></i>
                      <span className="num-count">1</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="drop_Message_Menu">
                      <Dropdown.Item className="drop_Message">
                        <Link to="/chat" style={{ display: "flex" }}>
                          <div className="image-wrap">
                            <img src={av1} alt="user" />
                          </div>
                          <div className="text-wrap">
                            <div className="d-flex justify-content-between">
                              <h6>خالد عوض</h6>
                              <span className="time">20 / 10 / 2024</span>
                            </div>
                            <p>
                              انشاء متجر الكتروني احترافي على منصة ووردبريس
                              ووكومرس
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="me">150 دولار ان شاء الله</h5>
                              <span className="message-number">2</span>
                            </div>
                          </div>
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item className="drop_Message">
                        <Link to="/chat" style={{ display: "flex" }}>
                          <div className="image-wrap">
                            <img src={av2} alt="user" />
                          </div>
                          <div className="text-wrap">
                            <div className="d-flex justify-content-between">
                              <h6>خالد عوض</h6>
                              <span className="time">18 / 10 / 2024</span>
                            </div>
                            <br />
                            <p>نظام الكتروني لعيادة طبية</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="me">150 دولار ان شاء الله</h5>
                              <span className="message-number">2</span>
                            </div>
                          </div>
                        </Link>
                      </Dropdown.Item>

                      <div className="showall">
                        <Link to="/notifications">جميع الإشعارات</Link>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            )}

            {!isLogged && (
              <>
                {/*auth login  */}
                <li className="link hide-sm2">
                  <div className="btns">
                    <Link to="/login">
                      <i className="fa-light fa-arrow-right-to-bracket"></i>{" "}
                      دخول
                    </Link>
                    <Link to="/register">
                      <i className="fa-light fa-user-plus"></i> حساب جديد
                    </Link>
                  </div>
                </li>
              </>
            )}

            {isLogged && (
              <>
                {/*profile picture */}
                <li className="link hide-sm2">
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ backgroundColor: "#f4f4f4" }}
                      id="dropdown-basic"
                    >
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="usermenu"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={user?.image} alt="user-avatar" />
                      </button>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="Menu">
                      <Dropdown.Item>
                        <Link className="dropdown-item_Link" to="/profile">
                          <i className="fa-solid fa-user"></i>
                          {user?.name}
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link className="dropdown-item_Link" to="/profile">
                          <i className="fa-sharp fa-solid fa-dollar-sign"></i>
                          الرصيد
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link className="dropdown-item_Link" to="/profile">
                          <i className="fa-solid fa-sliders"></i>
                          الإعدادات
                        </Link>
                      </Dropdown.Item>
                      <hr />

                      <Dropdown.Item>
                        <Link className="dropdown-item_Link" to="/About">
                          <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                          تعديل الحساب
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link className="dropdown-item_Link" to="/Contact">
                          <i className="fa-solid fa-circle-info"></i>
                          المساعده
                        </Link>
                      </Dropdown.Item>
                      <hr />

                      <Dropdown.Item>
                        <Link className="dropdown-item_Link" to="/logout">
                          <i className="fa-solid fa-right-from-bracket"></i>
                          تسجيل الخروج
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
