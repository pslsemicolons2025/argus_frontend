import React from "react";
import { Link } from "react-router-dom";
import { Progress, List, Tag, Flex } from "antd";
import { motion } from "framer-motion";
import "../../App.css";

export default function HomePageComponent({ setProject }) {
  const projects = [
    {
      id: "a1",
      projectName: "test-backend",
      description: "Total scans: 4",
      vulnerabilityCount: 11,
      techStack: "java",
      highSev: "10",
      moderateSev: "2",
      lowSev: "4",
    },
    {
      id: "a2",
      projectName: "test-frontend-app",
      description: "Total scans: 2",
      vulnerabilityCount: 25,
      techStack: "reactJS",
      highSev: "5",
      moderateSev: "8",
      lowSev: "6",
    },
    {
      id: "a3",
      projectName: "test-application",
      description: "Total scans: 3",
      vulnerabilityCount: 25,
      techStack: "nodeJS",
      highSev: "3",
      moderateSev: "4",
      lowSev: "6",
    },
    {
      id: "a4",
      projectName: "my-app",
      description: "Total scans: 4",
      vulnerabilityCount: 25,
      techStack: "java",
      highSev: "4",
      moderateSev: "2",
      lowSev: "8",
    },
    {
      id: "a5",
      projectName: "booking-app",
      description: "Total scans: 1",
      vulnerabilityCount: 25,
      techStack: "reactJS",
      highSev: "6",
      moderateSev: "2",
      lowSev: "10",
    },
  ];
  return (
    <div
      style={{
        fontFamily: "'Open Sans', sans-serif",
        padding: "30px",
        minHeight: "100vh",
        fontSize: "20px",
        color: "#8e8c8b",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Flex
          gap="middle"
          justify="space-between"
          align="flex-start"
          style={{
            fontSize: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              width: "25%",
              minWidth: "180px",
              padding: "15px 0 0 0",
            }}
          >
            <Progress
              type="circle"
              percent={100}
              format={() => "5"}
              status="normal"
            />
            <p>Total number of projects</p>
          </div>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              width: "25%",
              minWidth: "180px",
              padding: "15px 0 0 0",
            }}
          >
            <Progress type="circle" percent={100} format={() => "17"} />
            <p>Total number of scans</p>
          </div>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              width: "25%",
              minWidth: "180px",
              padding: "15px 0 0 0",
            }}
          >
            <Progress
              type="circle"
              percent={100}
              format={() => "26"}
              status="exception"
            />
            <p>Total number of vulnerabilities</p>
          </div>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              width: "25%",
              minWidth: "180px",
              padding: "15px 0 0 0",
            }}
          >
            <Progress type="circle" percent={100} format={() => "15"} />
            <p>Resolved vulnerabilities</p>
          </div>
        </Flex>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2
          style={{
            fontSize: "25px",
            borderRadius: "8px",
            backdropFilter: "blur(5px)",
          }}
        >
          Projects
        </h2>
        <List
          dataSource={projects}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              className="list-item-hover"
            >
              <Link
                to="/report"
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onClick={() => setProject(item)}
              >
                <List.Item.Meta
                  title={item.projectName}
                  description={item.description}
                />
                <Tag color="#890800">2 High</Tag>
                <Tag color="#EC5800">3 Moderate</Tag>
                <Tag color="#ffc100">5 Low</Tag>
                <Tag color="#1890ff">{item.techStack}</Tag>
              </Link>
            </List.Item>
          )}
        />
      </motion.div>
    </div>
  );
}
