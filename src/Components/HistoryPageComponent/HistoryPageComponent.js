import React from "react";
import { Link } from "react-router-dom";
import { List, Tag, Flex, Select } from "antd";
import { motion } from "framer-motion";
import "../../App.css";

export default function HistoryPageComponent({ selectedProject }) {
  {
    const history = [
      {
        id: "10189",
        createdAt: "19th March 2025",
        highSev: "3",
        moderateSev: "4",
        lowSev: "6",
      },
      {
        id: "10158",
        createdAt: "17th March 2025",
        highSev: "5",
        moderateSev: "2",
        lowSev: "4",
      },
    ];

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

    const projectValues = projects.map((i) => {
      return {
        value: i.projectName,
        label: i.projectName,
      };
    });

    return (
      <div
        style={{
          fontFamily: "'Open Sans', sans-serif",
          padding: "0 30px",
          minHeight: "100vh",
          fontSize: "20px",
          color: "#8e8c8b",
        }}
      >
        <Flex
          gap="middle"
          justify="space-between"
          align="flex-start"
          style={{
            fontSize: "20px",
          }}
        >
          <p>
            Project:
            {selectedProject && selectedProject.projectName != null && (
              <Select
                defaultValue={selectedProject.projectName}
                style={{ width: 200, paddingLeft: "10px" }}
                // onChange={handleChange}
                options={projectValues}
              />
            )}
          </p>
          <p>Total scans: {history.length}</p>
        </Flex>
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
            Run history
          </h2>
          <List
            dataSource={history}
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
                >
                  <List.Item.Meta
                    title={`Scan Id: ${item.id}`}
                    description={item.createdAt}
                  />
                  <Tag color="#890800">{item.highSev} High</Tag>
                  <Tag color="#EC5800">{item.moderateSev} Moderate</Tag>
                  <Tag color="#ffc100">{item.lowSev} Low</Tag>
                </Link>
              </List.Item>
            )}
          />
        </motion.div>
      </div>
    );
  }
}
