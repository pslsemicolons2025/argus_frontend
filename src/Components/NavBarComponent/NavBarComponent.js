import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const NavbarComponent = () => {
  const location = useLocation(); // Get current URL

  const menuItems = [
    { key: "/", label: "Home", path: "/" },
    { key: "/report", label: "Report", path: "/report" },
    { key: "/history", label: "History", path: "/history" },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: "0 20px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div
        className="logo"
        style={{ fontSize: "20px", fontWeight: "bold", color: "#1890ff" }}
      >
        Argus
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default NavbarComponent;
