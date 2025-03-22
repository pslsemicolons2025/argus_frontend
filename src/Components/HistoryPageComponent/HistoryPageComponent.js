import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Tag, Flex, Select, Spin } from "antd";
import { motion, useScroll } from "framer-motion";
import "../../App.css";

export default function HistoryPageComponent({ selectedProject, setScan }) {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectValues, setProjects] = useState(null);

  const processProjects = (projects) => {
    return projects.map((project) => {
      let highSev = 0;
      let moderateSev = 0;
      let lowSev = 0;

      // Ensure we are checking cves within the scan
      if (project.cves && Array.isArray(project.cves)) {
        project.cves.forEach((cve) => {
          const severity = cve.severity.toUpperCase(); // Normalize case

          if (severity === "HIGH") highSev++;
          else if (severity === "MEDIUM") moderateSev++;
          else if (severity === "LOW") lowSev++;
        });
      }

      return {
        ...project,
        highSev,
        moderateSev,
        lowSev,
      };
    });
  };

  useEffect(() => {
    const projectId = selectedProject?.projectId;

    fetch("http://54.174.73.151:8000/v1/allProjects")
      .then((response) => response.json())
      .then((result) => {
        setProjects(
          result.map((i) => {
            return {
              value: i.name,
              label: i.name,
            };
          })
        );
      });
    fetch(
      `http://54.174.73.151:8000/v1/getScansByProjectId/?project_id=${projectId}`
    )
      .then((response) => response.json())
      .then((result) => {
        const processedData = processProjects(result);
        console.log("processedData", processedData);
        setScans(processedData);
        setLoading(false);
        console.log("ttttt", result);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          color: "#5E5C5B",
        }}
      >
        <h2>Fetching scans...</h2>
        <Spin size="large" tip="Loading..." />
      </div>
    );

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

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert 24h to 12h format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${day}${daySuffix} ${month} ${year} ${hours}:${minutes}${ampm}`;
  }

  return (
    <div
      style={{
        fontFamily: "'Open Sans', sans-serif",
        padding: "0 30px",
        minHeight: "100vh",
        fontSize: "20px",
        color: "#5E5C5B",
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
          {selectedProject && selectedProject.name != null && (
            <Select
              defaultValue={selectedProject.name}
              style={{ width: 200, paddingLeft: "10px" }}
              // onChange={handleChange}
              options={projectValues}
            />
          )}
        </p>
        <p>Total scans: {scans != null ? scans.length : history.length}</p>
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
          dataSource={scans}
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
                onClick={() => {
                  setScan(item);
                  console.log(item);
                }}
              >
                <List.Item.Meta
                  title={`Scan Id: ${item.scan_id}`}
                  description={formatDate(item.timestamp)}
                />
                <Tag color="#890800">{item.highSev} High</Tag>
                <Tag color="#EC5800">{item.moderateSev} Medium</Tag>
                <Tag color="#ffc100">{item.lowSev} Low</Tag>
              </Link>
            </List.Item>
          )}
        />
      </motion.div>
    </div>
  );
}
