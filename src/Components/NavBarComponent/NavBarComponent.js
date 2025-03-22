import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const NavbarComponent = () => {
  const location = useLocation(); // Get current URL

  const menuItems = [
    { key: "/", label: "Home", path: "/" },
    { key: "/report", label: "Report", path: "/report", disabled: true },
    { key: "/history", label: "History", path: "/history", disabled: true },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: "0 20px",
        backgroundColor: "#1890ff",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div
        className="logo"
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/security-audit.png`}
          alt="Logo"
          style={{ width: "40px", height: "40px" }}
        />
        Argus
      </div>

      {/* Navigation Menu */}
      <Menu
        // theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#1890ff",
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            style={{ color: "#fff", fontSize: "18px" }}
            disabled={item.disabled || false}
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default NavbarComponent;
