import { Link } from "react-router-dom";
import { Progress, List, Tag, Flex, Card, Spin } from "antd";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../../App.css";

export default function HomePageComponent({ setProject, setScan }) {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCounts, setShowCounts] = useState(false);
  const [totalCvCount, setTotalCvCount] = useState(0);
  const [totalScansCount, setTotalScansCount] = useState(0);

  const techStacks = ["Python", "Java", "C++", "C", ".NET"];
  const descriptions = [
    "A scalable cloud-based application.",
    "A secure and high-performance system.",
    "An AI-powered analytics platform.",
    "A real-time data processing service.",
    "A robust microservices architecture.",
  ];

  const getSeverityCounts = (cveList) => {
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };

    cveList.forEach((cve) => {
      const severity = cve.severity.toLowerCase();

      if (severity.includes("critical")) counts.Critical++;
      else if (severity.includes("high")) counts.High++;
      else if (severity.includes("medium")) counts.Medium++;
      else if (severity.includes("low")) counts.Low++;
    });

    return counts;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: "#890800", // Dark Red
      High: "#c71010", // Red
      Medium: "#FF7F50", // Orange
      Low: "#ffc100", // Yellow
    };
    return colors[severity] || "#999"; // Default gray if severity is missing
  };

  const getTotalScans = (projects) => {
    return projects.reduce(
      (totalScan, project) => totalScan + (project.scan_count || 0),
      0
    );
  };

  useEffect(() => {
    if (responseData && responseData.length > 0) {
      const totalSeverities = getTotalSeverityCount(responseData);
      setTotalCvCount(totalSeverities);

      const totalScans = getTotalScans(responseData);
      setTotalScansCount(totalScans);
    }
    setScan(undefined);
  }, [responseData]);

  const getTotalSeverityCount = (projects) => {
    let totalCount = 0;

    projects.forEach((project) => {
      project.scans.forEach((scan) => {
        totalCount += scan.cve.length;
      });
    });

    return totalCount;
  };

  const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const projects = [
    {
      projectId: "a1",
      name: "test-backend",
      description: "Total scans: 4",
      vulnerabilityCount: 11,
      techStack: "java",
      highSev: "10",
      moderateSev: "2",
      lowSev: "4",
    },
    {
      projectId: "a2",
      name: "test-frontend-app",
      description: "Total scans: 2",
      vulnerabilityCount: 25,
      techStack: "reactJS",
      highSev: "5",
      moderateSev: "8",
      lowSev: "6",
    },
    {
      projectId: "a3",
      name: "test-application",
      description: "Total scans: 3",
      vulnerabilityCount: 25,
      techStack: "nodeJS",
      highSev: "3",
      moderateSev: "4",
      lowSev: "6",
    },
    {
      projectId: "a4",
      name: "my-app",
      description: "Total scans: 4",
      vulnerabilityCount: 25,
      techStack: "java",
      highSev: "4",
      moderateSev: "2",
      lowSev: "8",
    },
    {
      projectId: "a5",
      name: "booking-app",
      description: "Total scans: 1",
      vulnerabilityCount: 25,
      techStack: "reactJS",
      highSev: "6",
      moderateSev: "2",
      lowSev: "10",
    },
  ];

  const stats = [
    {
      title: "Total projects",
      count: responseData != null ? responseData.length : 5,
      icon: "project.png",
    },
    {
      title: "Total scans",
      count: totalScansCount,
      icon: "scan.png",
    },
    {
      title: "Total vulnerabilities",
      count: totalCvCount,
      icon: "cyber-threat.png",
    },
    {
      title: "Resolved vulnerabilities",
      count: 2029,
      icon: "maintenance.png",
    },
  ];

  const colors = {
    "Total projects": "#1890ff",
    "Total scans": "#FF7F50",
    "Total vulnerabilities": "red",
    "Resolved vulnerabilities": "#4ae84d",
  };

  useEffect(() => {
    fetch("http://54.174.73.151:8000/v1/allProjects")
      .then((response) => response.json())
      .then((result) => {
        setResponseData(result);
        setLoading(false);
        setShowCounts(true);
      })
      .catch((err) => {
        setLoading(false);
        setShowCounts(true);
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
        <h2>Fetching projects...</h2>
        <Spin size="large" tip="Loading..." />
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        padding: "30px",
        minHeight: "100vh",
        fontSize: "20px",
        color: "#5E5C5B",
      }}
    >
      {showCounts && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* <Flex
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
        </Flex> */}
          <Flex gap="middle" justify="space-between" wrap="wrap">
            {stats.map((stat, index) => (
              <Card
                key={index}
                style={{
                  width: "24%",
                  minWidth: "180px",
                  minHeight: "190px",
                  textAlign: "center",
                  borderRadius: "10px",
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #d9d9d9",
                  padding: "5px",
                }}
              >
                <Flex justify="space-between" align="center">
                  <div
                    style={{
                      fontSize: "58px",
                      fontWeight: "bold",
                      color: colors[stat.title],
                    }}
                  >
                    {stat.count}
                  </div>
                  <img
                    src={`${process.env.PUBLIC_URL}/${stat.icon}`}
                    alt="Logo"
                    style={{ width: "80px", height: "80px" }}
                  />
                </Flex>
                <div
                  style={{
                    fontSize: "15px",
                    color: "#5E5C5B",
                    // marginTop: "10px",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "18px",
                  }}
                >
                  {stat.title}
                </div>
              </Card>
            ))}
          </Flex>
        </motion.div>
      )}
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
          dataSource={
            responseData.detail !== "Not Found" ? responseData : projects
          }
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.projectId}
              style={{
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                fontSize: "50px",
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
                  setProject(item);
                }}
              >
                <List.Item.Meta
                  title={item.name}
                  description={getRandomValue(descriptions)}
                />
                {Object.entries(getSeverityCounts(item.scans[0].cve)).map(
                  ([severity, count]) =>
                    count > 0 && (
                      <Tag key={severity} color={getSeverityColor(severity)}>
                        {count} {severity}
                      </Tag>
                    )
                )}
                <Tag color="#1890ff">{getRandomValue(techStacks)}</Tag>
              </Link>
            </List.Item>
          )}
        />
      </motion.div>
    </div>
  );
}
