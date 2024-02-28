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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import CandidateListData from "./CandidateListData";
import MDInput from "components/MDInput";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
// import projectsTableData from "layouts/tables/data/projectsTableData";

function CandidateList() {
  // const [searchQuery, setSearchQuery] = useState('');
  const { columns, rows, loading } = CandidateListData();
  console.log(loading)
  // console.log(rows,"rows data")
  //   const { columns: pColumns, rows: pRows } = projectsTableData();
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h6" color="white">
                  Candidate List Table
                </MDTypography>
                {/* <MDTypography style={{ background: "white", width: "50%", marginBottom: "10px", borderRadius: "10px" }}>
                  <MDInput 
                  onChange={(e)=>setSearchQuery(e.target.value)}
                  style={{ width: "100%" }} autofil={false} label="Search user by name or email" />
                </MDTypography> */}

              </MDBox>

              <MDBox pt={3}>
                {loading ? (
                  <div align="center" variant="h6" mb={2} ml={4}>
                    <CircularProgress color='black' size={30} /></div>
                ) : (
                  <>
                    {rows.length > 0 ? (
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
                    ) : (
                      <MDTypography align="center" variant="h6" mb={2} ml={4}>
                        No Candidates
                      </MDTypography>
                    )}
                  </>
                )}
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CandidateList