import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// react-router-dom components
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Table, Button, Modal, Form} from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';


// import { MenuItem, Select } from '@material-ui/core';

// Authentication layout components
import BasicLayoutEditForm from "app_components/CandidateManage/DashboardNav";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import axios from "axios";
import { Cabin } from "@mui/icons-material";


function EditCandidateForm() {
  const authContext = useContext(AuthContext);
  const { _id } = useParams();
  const [candidateList, setCandidateList] = useState([]);
  const [candidateItem, setCandidateItem] = useState({})
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/all');
            // console.log('Response:', response.data);
            setCandidateList(response.data);


        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    fetchData();
}, []);

useEffect(() => {
    const candidate = candidateList.find(candidate => candidate._id === _id);
    if (candidate) {
        setInputs(candidate);
        // console.log(candidate);
    }
}, [candidateList, _id]);

    const handleEditModalClose = () => {
        // Redirect to a new page
        navigate('/Candidate-List');
    };

  const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
//   const [rememberMe, setRememberMe] = useState(false);

//   const [inputs, setInputs] = useState({
//     // email: "tes@gmail.com",
//     // password: "tes@123",
//   });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  // const addUserHandler = (newUser) => setUser(newUser);

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    // console.log(inputs)
  };
  const submitHandler = async (event) => {
    console.log(inputs)
    event.preventDefault();
    if (inputs.result === "On Hold") {
      try {
        await axios.post(`http://localhost:8080/updateTestResult/${inputs.email}`, { result: result })
        await axios.put(`http://13.233.161.128/appicant/update/comments`, { email: inputs.email, comment: `The applicant's test result has been updated from On Hold to <b> ${result} </b>`, commentBy: "TES System", cRound: "Online Assessment Test", nextRound: "Veera", status: "Hiring Manager" })
        window.location.reload()
      } catch (err) {
        console.log(err.message)
        alert('Failed to update the result. Please update the result again')
      }
    }
    try {
      await axios.put(`http://localhost:8080/edit/${inputs._id}`, {
        name: inputs.name,
        email: inputs.email,
        testStatus: inputs.testStatus,
        area: inputs.area,
        mcqCount: inputs.mcqCount,
        codeCount: inputs.codeCount,
        paragraphCount: inputs.paragraphCount,
      });
      const index = candidateList.findIndex((candidateItem) => {
        // console.log('candidateItem:', candidateItem);
        return candidateItem._id === inputs._id;
      });
      const updatedCandidates = [...candidateList];
    //   console.log(updatedCandidates)
      updatedCandidates[index].name = inputs.name;
      updatedCandidates[index].email = inputs.email;
    //   updatedCandidates[index].testStatus = testStatus;
      updatedCandidates[index].area = inputs.area;
      updatedCandidates[index].mcqCount = inputs.mcqCount;
      updatedCandidates[index].codeCount = inputs.codeCount;
      updatedCandidates[index].paragraphCount = inputs.paragraphCount;
      setInputs(updatedCandidates);
      navigate('/Candidate-List');
    //   setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
//   const submitHandler = async (e) => {
//     // check rememeber me?
//     e.preventDefault();

//     const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
//       setErrors({ ...errors, emailError: true });
//       return;
//     }

//     if (inputs.password.trim().length < 6) {
//       setErrors({ ...errors, passwordError: true });
//       return;
//     }

//     // const newUser = { email: inputs.email, password: inputs.password };
//     // addUserHandler(newUser);

//     // const myData = {
//     //   data: {
//     //     type: "token",
//     //     attributes: { ...newUser },
//     //   },
//     // };

//     try {
//       // const response = await AuthService.login(myData);
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginEvaluator`, inputs)
//       authContext.login(response.access_token, response.refresh_token);
//     } catch (res) {
//       if (res.hasOwnProperty("message")) {
//         setCredentialsError(res.message);
//       } else {
//         setCredentialsError(res.errors[0].detail);
//       }
//     }

//     return () => {
//       setInputs({
//         email: inputs.name,
//         password: "",
//       });

//       setErrors({
//         emailError: false,
//         passwordError: false,
//       });
//     };
//   };
  

  
//   const handleEditModalClose = (item) => {
//     // console.log(item)
//   }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{width:'60%', margin: '0px auto'}}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Edit Candidate Data
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={1} pb={3} px={3} >
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
          <MDBox mb={1} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                Enter Name
            </MDTypography>
            <MDInput
                type="text"
                fullWidth
                value={inputs.name}
                id="nameInput"
                name="name"
                onChange={changeHandler}
                error={errors.emailError}
            />
            </MDBox>

            <MDBox mb={2} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                Email
            </MDTypography>
              <MDInput
                type="email"
                label=""
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
              />
            </MDBox>
            <FormControl sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                Test Status
            </MDTypography>
                <Select
                    style={{ width: '100%', height: '40px', textAlign:"start"}}
                    label = ""
                    labelId="test-status-label"
                    id="test-status-select"
                    value={inputs.testStatus || "SELECT STATUS"}
                    
                    onChange={(event) => {
                    setInputs({
                        ...inputs,
                        testStatus: event.target.value,
                    });
                    }}
                    disabled={
                        inputs.testStatus === "Test Taken" ||
                        inputs.testStatus === "Evaluated"
                    }
                >
                    <MenuItem value="">Select status</MenuItem>
                    <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
                    <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
                </Select>
                </FormControl>
            <MDBox mb={2} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                Area
            </MDTypography>
                <MDInput
                    type="text"
                    label=""
                    fullWidth
                    // defaultValue=""
                    value={inputs.area}
                    name="area"
                    onChange={changeHandler}
                    error={errors.areaError}
                />
                </MDBox>
           {/* <MDBox mb={2}>
            <Select
                value={inputs.testStatus}
                onChange={(event) => {
                inputs({
                    ...inputs,
                    testStatus: event.target.value,
                });
                }}
                disabled={
                inputs.testStatus === "Test Taken" ||
                inputs.testStatus === "Evaluated"
                }
            >
                <MenuItem value="">Select status</MenuItem>
                <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
                <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
            </Select>
            </MDBox> */}

            
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
                <MDButton
                    style={{ marginRight: '10px' }}
                    variant="gradient"
                    color="info"
                    onClick={handleEditModalClose}
                >
                    Close
                </MDButton>
                <MDButton
                    variant="gradient"
                    color="success"
                    type="submit"
                    sx={{ backgroundColor: 'green' }}
                >
                    Save Changes
                </MDButton>
            </MDBox>

            {/* {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErros}
              </MDTypography>
            )} */}
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot your password? Reset it{" "}
                <MDTypography
                  component={Link}
                  to="/auth/forgot-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  here
                </MDTypography>
              </MDTypography>
            </MDBox> */}
            {/* <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default EditCandidateForm;