import { Col, Row, Space } from "antd";
import React from "react";
import {
  DollarCircleOutlined,
  UserOutlined,
  TagOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./style.css";
import { formatCash } from "../../../utils";
import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
Chart.register(CategoryScale, ArcElement, Tooltip, Legend);
/**
 *
 * tổng số doanh thu
 * tổng số người dung
 * tổng số sản phẩm
 * tổng số order
 */

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const dataPie = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
function Dashboard() {
  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginLeft: "0px", marginRight: "0px", marginBottom: "12px" }}
      >
        <Col md={6}>
          <div className="box-ad-page d-flex">
            <div className="box-head-dashboard box-head-dashboard-sales">
              <DollarCircleOutlined />
            </div>
            <div>
              <p className="box-head-dashboard-title">Tổng số doanh thu</p>
              <p className="box-head-dashboard-number">
                {formatCash(2100000000)}
              </p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="box-ad-page d-flex">
            <div className="box-head-dashboard box-head-dashboard-customer">
              <UserOutlined />
            </div>
            <div>
              <p className="box-head-dashboard-title">Tổng số người dùng</p>
              <p className="box-head-dashboard-number">28</p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="box-ad-page d-flex">
            <div className="box-head-dashboard box-head-dashboard-product">
              <TagOutlined />
            </div>
            <div>
              <p className="box-head-dashboard-title">Tổng số sản phẩm</p>
              <p className="box-head-dashboard-number">200</p>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="box-ad-page d-flex">
            <div className="box-head-dashboard box-head-dashboard-order">
              <ProfileOutlined />
            </div>
            <div>
              <p className="box-head-dashboard-title">Tổng số đơn hàng</p>
              <p className="box-head-dashboard-number">10</p>
            </div>
          </div>
        </Col>
      </Row>
      <div className="box-body-dashboard">
        <div className="box-ad-page box-body-line-dashboard">
          <Line data={data} />
        </div>
        <div className="box-ad-page box-body-pie-dashboard">
          <Pie data={dataPie} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
