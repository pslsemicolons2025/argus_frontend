import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Progress,
  List,
  Drawer,
  Tag,
  Tooltip as AntdTooltip,
  Typography,
  Divider,
  Flex,
  Button,
  Select,
  Space,
} from "antd";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ToolOutlined,
  ReloadOutlined,
  HistoryOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function ResultsPageComponent({ selectedProject }) {
  const [stage, setStage] = useState(1);
  const [percent, setPercent] = useState(0);
  const [running, setRunning] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showCharts, setShowCharts] = useState(true);
  const [showFixes, setShowFixes] = useState(true);
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(undefined);
  const [showProgressBars, setShowProgressBars] = useState(true);

  const showDrawer = (item) => {
    setOpen(true);
    setDrawerData(item);
  };

  const onClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   if (!running) return;

  //   if (percent < 100) {
  //     const increment = stage === 1 ? 6 : 4;
  //     const timer = setTimeout(
  //       () => setPercent((prev) => prev + increment),
  //       100
  //     );
  //     return () => clearTimeout(timer);
  //   } else {
  //     setTimeout(() => {
  //       if (stage < 3) {
  //         setStage(stage + 1);
  //         setPercent(0);
  //       } else {
  //         setRunning(false);
  //         setShowProgressBars(false);
  //         setTimeout(() => setShowTitle(true), 500);
  //         setTimeout(() => setShowCharts(true), 1000); // Show charts after title
  //         setTimeout(() => setShowFixes(true), 1500);
  //       }
  //     }, 500);
  //   }
  // }, [percent, stage, running]);

  const getProgressStatus = (currentStage) => {
    return stage > currentStage || (stage === currentStage && percent === 100)
      ? "success"
      : "active";
  };

  const cvResponse = {
    projectName: "test-backend",
    scanId: "10189",
    cvs: [
      {
        id: "1",
        category: "SQL Injection",
        vulnerability: "User input is not sanitized in login form.",
        description: "User input is not sanitized in login form.",
        severity: "Critical",
        color: "#890800", // High severity color
        solutions: [
          "Sanitize all user inputs to prevent SQL injection.",
          "Use parameterized queries instead of direct SQL strings.",
          "Implement a Web Application Firewall (WAF).",
        ],
      },
      {
        id: "2",
        category: "SQL Injection",
        vulnerability: "Dynamic SQL queries are being used.",
        description: "Dynamic SQL queries are being used.",
        severity: "High",
        color: "#890800",
        solutions: [
          "Use stored procedures to handle database queries.",
          "Restrict database user permissions to prevent unauthorized queries.",
          "Avoid string concatenation when constructing SQL queries.",
        ],
      },
      {
        id: "3",
        category: "SQL Injection",
        vulnerability: "Database error messages expose system details.",
        description: "Database error messages expose system details.",
        severity: "High",
        color: "#890800",
        solutions: [
          "Disable detailed error messages in production.",
          "Use generic error messages to avoid information leakage.",
          "Log errors securely without exposing sensitive data.",
        ],
      },
      {
        category: "SQL Injection",
        vulnerability: "User-provided input is concatenated into SQL queries.",
        description: "User-provided input is concatenated into SQL queries.",
        severity: "High",
        color: "#890800",
        solutions: [
          "Use prepared statements to execute SQL queries.",
          "Escape user input before processing database queries.",
          "Regularly test database queries for injection vulnerabilities.",
        ],
      },
      {
        category: "XSS",
        vulnerability: "User comments are rendered without escaping HTML.",
        description: "User comments are rendered without escaping HTML.",
        severity: "Moderate",
        color: "#EC5800", // Moderate severity color
        solutions: [
          "Escape user input before rendering to prevent XSS.",
          "Use frameworks that auto-escape output (e.g., React).",
          "Implement content security policies to restrict script execution.",
        ],
      },
      {
        category: "XSS",
        vulnerability: "Script tags are allowed in input fields.",
        description: "Script tags are allowed in input fields.",
        severity: "Moderate",
        color: "#EC5800",
        solutions: [
          "Validate and sanitize input to remove script tags.",
          "Use HTTP headers like `Content-Security-Policy` to block inline scripts.",
          "Implement input filtering to remove harmful HTML tags.",
        ],
      },
      {
        category: "XSS",
        vulnerability: "User profile images accept JavaScript payloads.",
        description: "Script tags are allowed in input fields.",
        severity: "Moderate",
        color: "#EC5800",
        solutions: [
          "Validate and sanitize file uploads to prevent script execution.",
          "Restrict allowed file types and enforce MIME type checking.",
          "Use separate domains for serving user-uploaded content.",
        ],
      },
      {
        category: "Insecure API",
        vulnerability:
          "API does not require authentication for sensitive endpoints.",
        description:
          "API does not require authentication for sensitive endpoints.",
        severity: "Low",
        color: "#ffc100", // Low severity color
        solutions: [
          "Ensure all API endpoints require authentication and authorization.",
          "Use OAuth tokens or API keys for authentication.",
          "Implement rate limiting to prevent abuse of open endpoints.",
        ],
      },
      {
        category: "Insecure API",
        vulnerability: "API responses contain excessive sensitive data.",
        description: "API responses contain excessive sensitive data.",
        severity: "Low",
        color: "#ffc100",
        solutions: [
          "Limit response data to only necessary fields.",
          "Use tokenization to protect sensitive data before transmission.",
          "Encrypt API responses containing user information.",
        ],
      },
    ],
  };

  const severityColorMap = {
    Low: "#ffc100",
    Moderate: "#FF7F50",
    High: "#E35335",
    Critical: "#890800",
  };

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

  // Pie Chart Data (Severity Levels)
  const severityData = [
    {
      name: "High",
      value: cvResponse.cvs.filter((i) => i.severity === "High").length,
      color: "#890800",
    },
    {
      name: "Moderate",
      value: cvResponse.cvs.filter((i) => i.severity === "Moderate").length,
      color: "#EC5800",
    },
    {
      name: "Low",
      value: cvResponse.cvs.filter((i) => i.severity === "Low").length,
      color: "#ffc100",
    },
  ];

  // Bar Chart Data (Vulnerability Categories)
  const vulnerabilityData = [
    {
      name: "SQL Injection",
      count: cvResponse.cvs.filter((i) => i.category === "SQL Injection")
        .length,
      color: "#890800",
    }, // High severity
    {
      name: "XSS",
      count: cvResponse.cvs.filter((i) => i.category === "XSS").length,
      color: "#EC5800",
    }, // Moderate severity
    {
      name: "Insecure API",
      count: cvResponse.cvs.filter((i) => i.category === "Insecure API").length,
      color: "#ffc100",
    }, // Low severity
  ];

  return (
    <div
      style={{
        fontFamily: "'Open Sans', sans-serif",
        textAlign: "center",
        padding: "0 30px",
        // background: "linear-gradient(to top, #374ABE, #64B5F6)",
        minHeight: "100vh",
        fontSize: "28px",
        // fontWeight: "bold",
        color: "#8e8c8b",
        // textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)", // Soft glow effect
      }}
    >
      {/* Progress Boxes */}
      {/* {showProgressBars && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "25%",
              minWidth: "180px",
              padding: "15px",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
            <p>Job Triggered</p>
            <Progress
              percent={stage >= 1 ? (stage === 1 ? percent : 100) : 0}
              status={getProgressStatus(1)}
              strokeWidth={12}
            />
          </div>

          {stage >= 2 && (
            <div
              style={{
                width: "25%",
                minWidth: "180px",
                padding: "15px",
                border: "2px solid #d9d9d9",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
              }}
            >
              <p>Scanning the Code</p>
              <Progress
                percent={stage >= 2 ? (stage === 2 ? percent : 100) : 0}
                status={getProgressStatus(2)}
                strokeWidth={12}
              />
            </div>
          )}

          {stage >= 3 && (
            <div
              style={{
                width: "25%",
                minWidth: "180px",
                padding: "15px",
                border: "2px solid #d9d9d9",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
              }}
            >
              <p>Generating Results</p>
              <Progress
                percent={stage === 3 ? percent : 0}
                status={getProgressStatus(3)}
                strokeWidth={12}
              />
            </div>
          )}
        </div>
      )} */}

      {/* Title with Animation */}
      {showTitle && (
        <>
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
                  style={{
                    width: 200,
                    paddingLeft: "10px",
                    fontWeight: "bold",
                  }}
                  // onChange={handleChange}
                  options={projectValues}
                />
              )}
            </p>
            <p>Run count: 5</p>
            <Link
              to="/history"
              style={{
                marginTop: "5px",
              }}
            >
              <HistoryOutlined /> <Space> View run history </Space>
            </Link>
          </Flex>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              textAlign: "center",
              padding: "5px",
              borderRadius: "8px",
              backdropFilter: "blur(5px)",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            Vulnerability scan report - #{cvResponse.scanId}
          </motion.div>
        </>
      )}

      {/* Charts */}
      {showCharts && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Pie Chart (Sliding in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              width: "350px",
              height: "350px",
              padding: "20px",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "23px" }}>Severity Breakdown</p>
            <PieChart width={220} height={220}>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: "12px" }}
                itemStyle={{ fontSize: "12px" }}
              />
            </PieChart>
            {/* Legend Below Pie Chart */}
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              {severityData.map((entry) => (
                <div
                  key={entry.name}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    fontSize: "18px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: entry.color,
                      marginRight: "5px",
                      borderRadius: "50%",
                    }}
                  ></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar Chart (Sliding in from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              width: "350px",
              height: "350px",
              padding: "20px",
              border: "2px solid #d9d9d9",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "23px", marginBottom: "32px" }}>
              Vulnerability types
            </p>
            <BarChart width={250} height={220} data={vulnerabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontSize: "12px" }} />
              <YAxis style={{ fontSize: "16px" }} />
              <Tooltip
                contentStyle={{ fontSize: "12px" }}
                itemStyle={{ fontSize: "12px" }}
              />
              <Bar dataKey="count" fill="#1890ff" style={{ margin: "16px" }} />
            </BarChart>

            {/* Custom Legend (same as PieChart) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                gap: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#1890ff",
                  }}
                ></div>
                <span style={{ fontSize: "18px" }}>Vulnerability Count</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Subtitle and Fixes Section */}
      {showFixes && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ marginTop: "30px", textAlign: "left", margin: "45px" }}
        >
          <Flex gap="middle" justify="space-between" align="flex-start">
            <>
              <h2
                style={{
                  fontSize: "25px",
                  borderRadius: "8px",
                  backdropFilter: "blur(5px)",
                }}
              >
                Identified vulnerabilities & recommended remediation
              </h2>
            </>
            <>
              <AntdTooltip title="Refresh">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ReloadOutlined />}
                  style={{ margin: "30px 8px 0 0" }}
                />
              </AntdTooltip>
            </>
          </Flex>
          <>
            <List
              dataSource={cvResponse.cvs}
              bordered
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  onClick={() => showDrawer(item)} // Clicking anywhere opens the drawer
                  actions={[
                    <AntdTooltip
                      title="View Recommendations"
                      key={`tooltip-${item.id}`}
                    >
                      <ToolOutlined
                        style={{ fontSize: "18px", cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering the list item click event
                          showDrawer(item);
                        }}
                      />
                    </AntdTooltip>,
                  ]}
                  style={{
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  className="list-item-hover"
                >
                  <List.Item.Meta
                    title={item.vulnerability}
                    description={item.description}
                  />
                  <Tag color="#1890ff">{item.category}</Tag>
                  <Tag color={severityColorMap[item.severity] || "#ccc"}>
                    {item.severity}
                  </Tag>
                </List.Item>
              )}
            />
            {typeof drawerData != undefined && drawerData != null && (
              <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                style={{ padding: "24px", backgroundColor: "#f9f9f9" }}
              >
                <Title
                  level={4}
                  style={{
                    marginBottom: 16,
                    textAlign: "center",
                    color: "#8e8c8b",
                  }}
                >
                  <HeatMapOutlined style={{ marginRight: 52 }} />
                  {drawerData.vulnerability}
                  <HeatMapOutlined style={{ marginLeft: 50 }} />
                </Title>

                <Divider />

                <Paragraph>
                  <Text strong>Description:</Text>
                  <br />
                  {drawerData.description}
                </Paragraph>

                <Divider />

                <Title level={5}>Possible Solutions:</Title>
                <ul style={{ paddingLeft: 20 }}>
                  {drawerData.solutions.map((solution, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#1890ff",
                          borderRadius: "50%",
                          marginRight: "10px",
                          flexShrink: 0,
                        }}
                      ></span>
                      <Text style={{ color: "black" }}>{solution}</Text>
                    </li>
                  ))}
                </ul>
              </Drawer>
            )}
          </>
        </motion.div>
      )}
    </div>
  );
}
