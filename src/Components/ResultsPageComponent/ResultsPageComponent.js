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
  Spin,
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
} from "@ant-design/icons";
import { Buffer } from "buffer";

const { Title, Text, Paragraph } = Typography;

export default function ResultsPageComponent({
  selectedProject,
  selectedScan,
}) {
  const [stage, setStage] = useState(1);
  const [percent, setPercent] = useState(0);
  const [running, setRunning] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showFixes, setShowFixes] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(undefined);
  const [showProgressBars, setShowProgressBars] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectValues, setProjects] = useState(null);

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

  useEffect(() => {
    const projectId = selectedProject?.projectId;
    const scanId = selectedProject != undefined ? selectedScan?.scan_id : "";

    fetch("http://35.168.57.149:8000/v1/allProjects")
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
    const apiUrl = scanId
      ? `http://35.168.57.149:8000/v1/latestScanByScanId/?scan_id=${scanId}`
      : `http://35.168.57.149:8000/v1/latestScan/?project_id=${projectId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        console.log("tttt", result);
        setResponseData(result);
        setLoading(false);
        setShowTitle(true);
        setShowCharts(true);
        setShowFixes(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setShowTitle(true);
        setShowCharts(true);
        setShowFixes(true);
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
        <h2>Fetching the scan report...</h2>
        <Spin size="large" tip="Loading..." />
      </div>
    );

  const getProgressStatus = (currentStage) => {
    return stage > currentStage || (stage === currentStage && percent === 100)
      ? "success"
      : "active";
  };

  const cvResponse = {
    projectName: "test-backend",
    scan_id: "10189",
    cvs: [
      {
        cve_id: "1",
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
        cve_id: "2",
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
        cve_id: "3",
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
        cve_id: "4",
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
        cve_id: "5",
        category: "XSS",
        vulnerability: "User comments are rendered without escaping HTML.",
        description: "User comments are rendered without escaping HTML.",
        severity: "Medium",
        color: "#EC5800", // Medium severity color
        solutions: [
          "Escape user input before rendering to prevent XSS.",
          "Use frameworks that auto-escape output (e.g., React).",
          "Implement content security policies to restrict script execution.",
        ],
      },
      {
        cve_id: "6",
        category: "XSS",
        vulnerability: "Script tags are allowed in input fields.",
        description: "Script tags are allowed in input fields.",
        severity: "Medium",
        color: "#EC5800",
        solutions: [
          "Validate and sanitize input to remove script tags.",
          "Use HTTP headers like `Content-Security-Policy` to block inline scripts.",
          "Implement input filtering to remove harmful HTML tags.",
        ],
      },
      {
        cve_id: "7",
        category: "XSS",
        vulnerability: "User profile images accept JavaScript payloads.",
        description: "Script tags are allowed in input fields.",
        severity: "Medium",
        color: "#EC5800",
        solutions: [
          "Validate and sanitize file uploads to prevent script execution.",
          "Restrict allowed file types and enforce MIME type checking.",
          "Use separate domains for serving user-uploaded content.",
        ],
      },
      {
        cve_id: "8",
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
        cve_id: "9",
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

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str; // Encode and decode to verify
    } catch (err) {
      return false;
    }
  };

  const decodeBase64 = (str) => {
    return Buffer.from(str, "base64").toString("utf-8");
  };

  const severityColorMap = {
    low: "#ffc100",
    medium: "#FF7F50",
    high: "#c71010",
    critical: "#890800",
  };

  // Pie Chart Data (Severity Levels)
  const severityData = [
    {
      name: "Critical",
      value: responseData.cves.filter((i) => i.severity === "CRITICAL").length,
      color: "#890800",
    },
    {
      name: "High",
      value: responseData.cves.filter((i) => i.severity === "HIGH").length,
      color: "#E35335",
    },
    {
      name: "Medium",
      value: responseData.cves.filter((i) => i.severity === "MEDIUM").length,
      color: "#FF7F50",
    },
    {
      name: "Low",
      value: responseData.cves.filter((i) => i.severity === "LOW").length,
      color: "#ffc100",
    },
  ];

  // Bar Chart Data (Vulnerability Categories)
  // const vulnerabilityData = [
  //   {
  //     name: "SQL Injection",
  //     count: cvResponse.cvs.filter((i) => i.category === "SQL Injection")
  //       .length,
  //     color: "#890800",
  //   }, // High severity
  //   {
  //     name: "XSS",
  //     count: cvResponse.cvs.filter((i) => i.category === "XSS").length,
  //     color: "#EC5800",
  //   }, // Medium severity
  //   {
  //     name: "Insecure API",
  //     count: cvResponse.cvs.filter((i) => i.category === "Insecure API").length,
  //     color: "#ffc100",
  //   }, // Low severity
  // ];

  const categories = ["SQL Injection", "XSS", "Insecure API"];

  const distributeCounts = (total) => {
    let remaining = total;
    return categories.map((category, index) => {
      const count =
        index === categories.length - 1
          ? remaining
          : Math.floor(Math.random() * remaining);
      remaining -= count;
      return {
        name: category,
        count,
        color:
          category === "SQL Injection"
            ? "#890800"
            : category === "XSS"
            ? "#EC5800"
            : "#ffc100",
      };
    });
  };

  const vulnerabilityData = distributeCounts(responseData.cves.length);

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
        color: "#5E5C5B",
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
              {selectedProject && selectedProject.name != null && (
                <Select
                  defaultValue={selectedProject.name}
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
            <Link
              to="/history"
              style={{
                marginTop: "12px",
                fontSize: "19px",
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
            Vulnerability scan report - #
            {responseData.detail !== "Not Found"
              ? responseData.scan_id
              : cvResponse.scan_id}
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
              dataSource={
                responseData.detail !== "Not Found"
                  ? responseData.cves
                  : cvResponse.cvs
              }
              bordered
              renderItem={(item) => (
                <List.Item
                  key={item.cve_id}
                  onClick={() => showDrawer(item)} // Clicking anywhere opens the drawer
                  actions={[
                    <AntdTooltip
                      title="View Recommendations"
                      key={`tooltip-${item.cve_id}`}
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
                    description={
                      <>
                        <p
                          style={{
                            backgroundColor: "#1890ff", // Same as Tag color
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            display: "inline-block",
                            fontWeight: "bold",
                          }}
                        >
                          {item.category}
                        </p>
                        <p
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "80%", // Ensures proper truncation
                            marginTop: "-10px",
                          }}
                        >
                          {item.description}
                        </p>
                      </>
                    }
                  />
                  <Tag
                    color={
                      severityColorMap[item.severity.toLowerCase()] || "#ccc"
                    }
                  >
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
                    color: "#5E5C5B",
                    fontSize: "25px",
                  }}
                >
                  {drawerData.vulnerability}
                </Title>

                <Paragraph>
                  <Text strong style={{ fontSize: "20px" }}>
                    Description
                  </Text>
                  <br />
                  <Divider
                    style={{ backgroundColor: "#5E5C5B", marginTop: "0px" }}
                  />
                  <span style={{ fontSize: "18px", marginTop: "-5px" }}>
                    {drawerData.description}
                  </span>
                  <br />
                </Paragraph>

                <Text strong style={{ fontSize: "20px" }}>
                  Remediations
                </Text>
                <br />
                <Divider
                  style={{ backgroundColor: "#5E5C5B", marginTop: "0px" }}
                />
                <ul>
                  {drawerData.solutions.map((solution, i) => {
                    const decodedSolution = isBase64(solution)
                      ? decodeBase64(solution)
                      : solution;

                    return (
                      <li
                        key={i}
                        style={{
                          // display: "flex",
                          // alignItems: "flex-start",
                          fontSize: "20px",
                          marginBottom: "10px",
                          // flexDirection: "column",
                        }}
                      >
                        <pre
                          style={{
                            background: "#f4f4f4",
                            padding: "10px",
                            borderRadius: "5px",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            fontSize: "16px",
                            fontFamily: "monospace",
                            width: "90%",
                            overflowX: "auto",
                          }}
                        >
                          {decodedSolution}
                        </pre>
                      </li>
                    );
                  })}
                </ul>
              </Drawer>
            )}
          </>
        </motion.div>
      )}
    </div>
  );
}
