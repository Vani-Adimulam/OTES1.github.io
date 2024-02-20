/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import DomainCard from "./DomainCard";

function ViewQuestionsHomePage() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Registered"
                count={100}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Test Taken"
                count="80"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Evaluated"
                count="70"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Pending"
                count="10"
                percentage={{
                  color: "",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid> */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <DomainCard
                  color="info"
                  title="VLSI QUESTIONS"
                  description="Fresher/Experience"
                  date="just updated"
                  area ='VLSI'
                  image="data:image/jpeg;base64,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"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="success"
                  title="EMBEDED QUESTIONS"
                  description="Fresher/Experience"
                  area='EMBEDDED'
                  image="https://www.einfochips.com/blog/wp-content/uploads/2018/12/how-rtos-for-embedded-systems-powers-the-internet-of-things-featured01.jpg"
                //   description={
                //     <>
                //       (<strong>+15%</strong>) increase in today sales.
                //     </>
                //   }
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="dark"
                  title="SOFTWARE"
                  description="React/Node/Python"
                  area='SOFTWARE'
                  date="just updated"
                  image="https://www.coderus.com/wp-content/uploads/2020/11/different-types-of-software-coderus-branded-image.jpg"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <MDBox>
        
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewQuestionsHomePage;
