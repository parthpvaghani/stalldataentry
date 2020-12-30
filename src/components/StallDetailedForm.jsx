/*eslint-disable*/
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import AlertDialog from './AlertDialog'
import { DropzoneArea } from "material-ui-dropzone";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import LinearProgress from "@material-ui/core/LinearProgress";
import {uploadFiles} from '../factoryjs/asset-uploader-factory'
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import ConfirmDialog from "./ConfirmDialog";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { green, pink } from "@material-ui/core/colors";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormLabel,
  FormGroup,
  FormHelperText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import firebase from "../firebase.js";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
// import { merge } from 'jquery';
// import { resolve } from 'path';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    width: "100%",
    variant: "outlined",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  tab: {
    flexGrow: 1,
  },
  avatarimage: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
    padding: "10px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    margin: "10px",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

let imgList = [];
let names = [];
let docid;
const StallDetailedForm = ({ className, redirectBack, ...rest }) => {
  const [newArray, setNewArray] = useState([]);
  const [tabValue, setTabValue] = React.useState("1");
  const [spin, setSpin] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [certificationImage, setCertificationImage] = useState("");
  const [certificationUrl, setCertificationUrl] = useState([]);

  const [Files, setFiles] = useState("");
  const [FilesUrl, setFilesUrl] = useState([]);

  const allInputs = { imgUrl: "" };
  const [stallBanner, setStallBanner] = useState("");
  const [profileCompletion, setProfileCompletion] = useState("");
  const [stallBannerUrl, setStallBannerUrl] = useState(allInputs);
  const [MultipaleProduct, setMultipaleProduct] = useState([]);

  const [values, setValues] = useState({
    // text fields
    developername: "",
    projectname: "",
    contactdetail: "",
    chatlink: "",
    backlinkprojectid: "",
    backlink: "",
    like: "",
    projectid: "",
    developerlink: "",
    location: "",
    viewerlink: "",
    // images
    developerlogo:'',
    imagepanel1:'',
    imagepanel2:'',
    imagepanel3:'',
    projectlogo:'',
    inroperspectivegif:'',
    standeepanel1:'',
    standeepanel2:'',
    // video
    projectofferflash:'',
    introvideopanel:'',
    // dropdown
    projectbudget:[],
    projectconfig:[],
    projectsizerange:[],
    // document
    projectbrochure:'',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const deleteDialogConfirmation = (photourl) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    firebase
      .firestore()
      .collection("users")
      .doc(docid)
      .update({
        certificationsUrl: firebase.firestore.FieldValue.arrayRemove(photourl),
      });
  };

  const deleteCatalogueDialogConfirmation = (fileurl) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    firebase
      .firestore()
      .collection("users")
      .doc(docid)
      .update({
        fileUrl: firebase.firestore.FieldValue.arrayRemove(fileurl),
      });
  };

  useEffect(() => {
   
    // const Uid = localStorage.getItem("uid");
    // const firestore = firebase.firestore();
    // const dbQuery = new Promise((a, z) => {
    //   let getData = firestore.collection("users");
    //   getData = getData.where("uid", "==", Uid);
    //   getData = getData.where("userRole", "==", "exhibitor");
    //   getData
    //     .get()
    //     .then((querySnapshot) => {
    //       if (!querySnapshot.empty) {
    //         querySnapshot.forEach((doc) => {
    //           docid = doc.id;
    //           const docData = doc.data();
    //           a(docData);
    //         });
    //       } else {
    //         z("Not Found");
    //       }
    //     })
    //     .catch((error) => {
    //       z(error);
    //     });
    // });
    // dbQuery
    //   .then((result) => {
    //     const allData = result;
    //     imgList = allData.src;
    //     setValues({
    //       ...values,
    //       developername: allData.companyName ? allData.companyName : "",
    //       companyprofile: allData.description ? allData.description : "",
    //       contactnumber: allData.contactNo ? allData.contactNo : "",
    //       establishedyear: allData.establishedYear
    //         ? allData.establishedYear
    //         : "",
    //       noofcertificates: allData.noofCertificates
    //         ? allData.noofCertificates
    //         : "",
    //       productcategory: allData.productCategory
    //         ? allData.productCategory
    //         : [],
    //       website: allData.website ? allData.website : "",
    //       country: allData.exportCountry ? allData.exportCountry : "",
    //       market: allData.market ? allData.market : "",
    //       brands: allData.brands ? allData.brands : "",
    //       fblink: allData.fbLink ? allData.fbLink : "",
    //       whatsappnumber: allData.whatsappNumber ? allData.whatsappNumber : "",
    //       alternatenumber: allData.alternateNumber
    //         ? allData.alternateNumber
    //         : "",
    //       contactemail: allData.contactEmail ? allData.contactEmail : "",
    //       iglink: allData.igLink ? allData.igLink : "",
    //       pinterestlink: allData.pinterestLink ? allData.pinterestLink : "",
    //       twitterlink: allData.twitterLink ? allData.twitterLink : "",
    //       linkedinlink: allData.linkedinLink ? allData.linkedinLink : "",
    //       contactvisibility:
    //         allData.contactVisibility !== undefined
    //           ? allData.contactVisibility
    //           : false,
    //       socialmediavisibility:
    //         allData.socialMediaPrivacy !== undefined
    //           ? allData.socialMediaPrivacy
    //           : false,
    //       stallvisibility:
    //         allData.stallVisibility !== undefined
    //           ? allData.stallVisibility
    //           : false,
    //       stallPassword:
    //         allData.stallPassword !== undefined ? allData.stallPassword : "",
    //       availableFrom: allData.availableFrom ? allData.availableFrom : "",
    //       availableTo: allData.availableTo ? allData.availableTo : "",
    //       city: allData.city ? allData.city : "",
    //       state: allData.state ? allData.state : "",
    //       address: allData.address ? allData.address : "",
    //       certificationurl: allData.certificationsUrl
    //         ? allData.certificationsUrl
    //         : [],
    //       fileurl: allData.fileUrl ? allData.fileUrl : [],
    //     });

    //     if (allData.productCategory) {
    //       setMultipaleProduct(allData.productCategory);
    //     } else {
    //       setMultipaleProduct([]);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error === "Not Found") {
    //       console.log("User Not found");
    //     } else {
    //       console.error(error);
    //     }
    //   });

    // const catQuery = new Promise((abc, xyz) => {
    //   const categoryData = firestore.collection("categories");
    //   categoryData
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         const docData = doc.data();
    //         names.push({ keyType: docData.name });
    //         abc(docData);
    //       });
    //       setNewArray(names);
    //     })
    //     .catch((error) => {
    //       xyz(error);
    //     });
    // });

    // catQuery
    //   .then((result) => {})
    //   .catch((err) => {
    //     console.log("not stored drop down data", err);
    //   });

    // setProfileCompletionFunc();
  }, []);

  const getFileName = (url) => {
    let splitUrl = url.split("/");
    let tempname1 = splitUrl[splitUrl.length - 1];
    let tempname2 = tempname1.split("%20").join("");
    let final = tempname2.split("%24");
    return decodeURI(final[0]);
  };

  const setAlertDialogfunc = () => {
    setAlertDialog({
      ...alertDialog,
      isOpen: false,
      title: "",
      subTitle: "",
    });
  };
  const classes = useStyles();


  const handleChange = (event) => {
    console.log(event.target.name);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const setProfileCompletionFunc = () => {
    const getCompletionData = new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .where("uid", "==", localStorage.getItem("uid"))
        .where("userRole", "==", "exhibitor")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              docid = doc.id;
              let docData = doc.data();
              resolve(docData);
            });
          }
        });
    });

    getCompletionData.then((docData) => {
      let count = 0;
      for (let property in docData) {
        if (!(docData[property] === "")) {
          count = count + 1;
        }
      }
      setProfileCompletion(count);
    });
  };

  const handleCertificationChange = (e) => {
    setCertificationImage(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setValues({
      ...values,
      [e.target.name]: e.target.files[0],
    });
  };

  // ------------Multipale select-----------------
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  const handleChangeDropdown = (event) => {
    setValues({
      ...values,
      [event.target.name]:event.target.value,
    });
  };

  // ------------RAdio Button -----------------
  // social media buttons visibility

  const handleChangeDropZone = (files) => {
    setValues({
      ...values,
      projectbrochure:files
    });
  };

  const handleFileChangeDropZone = (files) => {
    setFiles(files);
  };

  const onUploadCertificationsWithAWS = () => {
    setSpin(true);
    if (certificationImage.length) {
         uploadFiles(certificationImage,'widgetimage',true).then(url=>{
          const backValue = false;
          const firestore = firebase.firestore();
          firestore
              .collection("users").doc(docid)
              .set({
                  certificationsUrl: url,
              }, { merge: true })
              .then(() => {
                  resolve("Done");
                  setSpin(false)
              })
              .catch(error => {
                  reject(error);
                  setSpin(false)
              });
          setAlertDialog({
              isOpen: true,
              title: "Certification Uploaded"
          });
         }).catch(err=>{
             console.log(err)
             setSpin(false)
         })
    } else {
      setAlertDialog({
        isOpen: true,
        title: "Please Add Certificates",
      });
      setSpin(false);
    }
  };

  const logOut = () => {
      console.log('logout click')
      firebase.auth().signOut().then(res=>{

          window.location.href='/'
      })
  }

  const onUploadFilesWithAWS = () => {
    setSpin(true);
    if (Files.length) {
      uploadFiles(Files,'widgetdocument',true).then(url=>{
          const backValue = false;
          const firestore = firebase.firestore();
          firestore
              .collection("users").doc(docid)
              .set({
                  fileUrl: url,
              }, { merge: true })
              .then(() => {
                  resolve("Done");
                  setSpin(false)
              })
              .catch(error => {
                  reject(error);
                  setSpin(false)
              });
          setAlertDialog({
              isOpen: true,
              title: "File Uploaded"
          });
      }).catch(err=>{
          console.log(err)
      })
    } else {
      setAlertDialog({
        isOpen: true,
        title: "Please Add Catalogue",
      });
      setSpin(false);
    }
  };

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
            <Box style={{display:'flex',justifyContent:'space-between'}}>
            <CardHeader title="Stall Data Entry" />
            <Button variant="contained" color="secondary" onClick={logOut} style={{height:'30px',alignSelf:'center',marginRight:'5px'}}>Log Out</Button>
            </Box>
          <Divider />
          <CardContent>
            <div className={classes.tab}>
              <TabContext value={tabValue}>
                <AppBar position="static">
                  <TabList onChange={handleTabChange} aria-label="profiletab">
                    <Tab label="Stall Primary Data" value="1" />
                    <Tab label="Stall Images" value="2" />
                    <Tab label="Stall Videos" value="3" />
                    <Tab label="Stall Project Selectable" value="4" />
                    <Tab label="Stall Documents" value="5" />
                  </TabList>
                </AppBar>
                <TabPanel value="1">
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Developer Name"
                        name="developername"
                        onChange={handleChange}
                        required
                        value={values.developername}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        label="Project Name"
                        name="projectname"
                        onChange={handleChange}
                        required
                        value={values.projectname}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Contact Detail"
                        name="contactdetail"
                        onChange={handleChange}
                        required
                        value={values.contactdetail}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="Chat Link"
                        name="chatlink"
                        onChange={handleChange}
                        required
                        value={values.chatlink}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Back Link Project ID"
                        name="backlinkprojectid"
                        onChange={handleChange}
                        required
                        value={values.backlinkprojectid}
                        variant="outlined"
                      />
                    </Grid>



                    {/* <Grid item md={12} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel fullWidth id="demo-mutiple-checkbox-label">
                          Product Category
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          label="Product Category"
                          inputProps={{
                            name: "Product Category",
                            id: "demo-mutiple-checkbox-label",
                          }}
                          value={MultipaleProduct}
                          onChange={handleChangeDropdown}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {newArray.map((name) => (
                            <MenuItem key={name.keyType} value={name.keyType}>
                              <Checkbox
                                checked={
                                  MultipaleProduct
                                    ? MultipaleProduct.includes(name.keyType)
                                    : false
                                }
                              />
                              <ListItemText primary={name.keyType} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="backlink"
                        helperText="Please enter web address with http/https"
                        name="website"
                        onChange={handleChange}
                        required
                        value={values.backlink}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="like"
                        name="like"
                        onChange={handleChange}
                        required
                        value={values.like}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="Project Id"
                        name="projectid"
                        onChange={handleChange}
                        required
                        value={values.projectid}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="Developer Link"
                        name="developerlink"
                        onChange={handleChange}
                        required
                        value={values.developerlink}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="State"
                        name="state"
                        onChange={handleChange}
                        required
                        value={values.state}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="Location"
                        name="location"
                        onChange={handleChange}
                        required
                        value={values.location}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        type="text"
                        fullWidth
                        label="Viewer Link"
                        name="viewerlink"
                        onChange={handleChange}
                        required
                        value={values.viewerlink}
                        variant="outlined"
                      />
                    </Grid>
                   
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <Grid item md={6} xs={12}>
                      <label htmlFor="developerlogo">
                        <input
                          style={{ display: "none" }}
                          id="developerlogo"
                          name="developerlogo"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload Developer Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.developerlogo.name}</span>
                    </Grid>
                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="imagepanel1">
                        <input
                          style={{ display: "none" }}
                          id="imagepanel1"
                          name="imagepanel1"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload imagepanel1 Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.imagepanel1.name}</span>
                    </Grid>
                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="imagepanel2">
                        <input
                          style={{ display: "none" }}
                          id="imagepanel2"
                          name="imagepanel2"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload imagepanel2 Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.imagepanel2.name}</span>
                    </Grid>
                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="imagepanel3">
                        <input
                          style={{ display: "none" }}
                          id="imagepanel3"
                          name="imagepanel3"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload imagepanel3 Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.imagepanel3.name}</span>
                    </Grid>
                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="projectlogo">
                        <input
                          style={{ display: "none" }}
                          id="projectlogo"
                          name="projectlogo"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload projectlogo Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.projectlogo.name}</span>
                    </Grid>
                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="inroperspectivegif">
                        <input
                          style={{ display: "none" }}
                          id="inroperspectivegif"
                          name="inroperspectivegif"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload inroperspectivegif Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.inroperspectivegif.name}</span>
                    </Grid>

                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="standeepanel1">
                        <input
                          style={{ display: "none" }}
                          id="standeepanel1"
                          name="standeepanel1"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload standeepanel1 Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.standeepanel1.name}</span>
                    </Grid>

                    <br/>
                    <Grid item md={6} xs={12}>
                      <label htmlFor="standeepanel2">
                        <input
                          style={{ display: "none" }}
                          id="standeepanel2"
                          name="standeepanel2"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload standeepanel2 Logo
                        </Fab>
                      </label>
                      <br />
                      <span>{values.standeepanel2.name}</span>
                    </Grid>
               
                </TabPanel>
                <TabPanel value="3">
              <Grid item md={6} xs={12}>
                      <label htmlFor="projectofferflash">
                        <input
                          style={{ display: "none" }}
                          id="projectofferflash"
                          name="projectofferflash"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload Project Offer Flash 
                        </Fab>
                      </label>
                      <br />
                      <span>{values.projectofferflash.name}</span>
                    </Grid>
                    <br/>

                    <Grid item md={6} xs={12}>
                      <label htmlFor="introvideopanel">
                        <input
                          style={{ display: "none" }}
                          id="introvideopanel"
                          name="introvideopanel"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload Intro Video Panel 
                        </Fab>
                      </label>
                      <br />
                      <span>{values.introvideopanel.name}</span>
                    </Grid>



                  {/* <Grid container spacing={3}>
                    <Grid item md={6} xs={6}>
                      <div>
                        <div>Social Media Privacy</div>
                        <RadioGroup
                          onChange={handleChange}
                          name="socialmediavisibility"
                          value={values.socialmediavisibility}
                        >
                          <div>
                            <FormControlLabel
                              type="radio"
                              value="false"
                              control={<Radio color="primary" />}
                              label="Show Social Media Links"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              type="radio"
                              value="true"
                              control={<Radio color="primary" />}
                              label="Don't Show Social Media Links"
                            />
                          </div>
                        </RadioGroup>
                      </div>
                    </Grid>

                    <Grid item md={6} xs={6}>
                      <div>
                        <div>Stall Password</div>
                        <RadioGroup
                          onChange={handleChange}
                          name="stallvisibility"
                          value={values.stallvisibility}
                        >
                          <div>
                            <FormControlLabel
                              type="radio"
                              value="true"
                              control={<Radio color="primary" />}
                              label="Without Password"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              type="radio"
                              value="false"
                              control={<Radio color="primary" />}
                              label="With Password"
                            />
                          </div>
                        </RadioGroup>
                      </div>
                    </Grid>

                    {values.stallvisibility == "false" ? (
                      <Grid item md={6} xs={6}>
                        <div>
                          <TextField
                            onChange={handleChange}
                            name="stallPassword"
                            value={values.stallPassword}
                            type="password"
                            fullWidth
                            label="Stall Password Protection"
                            required
                            variant="outlined"
                          />
                        </div>
                      </Grid>
                    ) : (
                      ""
                    )}

                    <Grid item md={6} xs={6}>
                      <div>
                        <div>Contact Details Visibility</div>
                        <RadioGroup
                          onChange={handleChange}
                          name="contactvisibility"
                          value={values.contactvisibility}
                        >
                          <div>
                            <FormControlLabel
                              type="radio"
                              value="true"
                              control={<Radio color="primary" />}
                              label="Show Contact Details"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              type="radio"
                              value="false"
                              control={<Radio color="primary" />}
                              label="Don't Show Contact Details"
                            />
                          </div>
                        </RadioGroup>
                      </div>
                    </Grid>
                  </Grid>
                */}
                </TabPanel>
                <TabPanel value="4">

                  <Grid item md={12} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel fullWidth id="demo-mutiple-checkbox-label">
                        Project Budget
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          label="Project Budget"
                          inputProps={{
                            name: "Project Budget",
                            id: "demo-mutiple-checkbox-label",
                          }}
                          value={values.projectbudget}
                          onChange={handleChangeDropdown}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {values.projectbudget.map((name) => (
                            <MenuItem key={name.keyType} value={name.keyType}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <br/>
                    <Grid item md={12} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel fullWidth id="demo-mutiple-checkbox-label">
                        Project Config
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          label="Project Config"
                          inputProps={{
                            name: "Project Config",
                            id: "demo-mutiple-checkbox-label",
                          }}
                          value={values.projectconfig}
                          onChange={handleChangeDropdown}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {values.projectconfig.map((name) => (
                            <MenuItem key={name.keyType} value={name.keyType}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <br/>
                    <Grid item md={12} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel fullWidth id="demo-mutiple-checkbox-label">
                        Project Size Range
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          label="Project Size Range"
                          inputProps={{
                            name: "Project Size Range",
                            id: "demo-mutiple-checkbox-label",
                          }}
                          value={values.projectsizerange}
                          onChange={handleChangeDropdown}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {values.projectsizerange.map((name) => (
                            <MenuItem key={name.keyType} value={name.keyType}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>



                  {/* <Grid item md={12} xs={12}>
                    <h2>Uploaded Certification</h2>
                    <Grid item md={12} xs={12} className={classes.avatarimage}>
                      {values.certificationurl.map((url, index) => {
                        return (
                          <Avatar
                            key={index}
                            src={url}
                            className={classes.large}
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title:
                                  "Are you sure you want to Delete this certificate?",
                                subTitle:
                                  "Once deleted, you can't undo this action",
                                onConfirm: () => {
                                  deleteDialogConfirmation(url);
                                },
                              })
                            }
                          />
                        );
                      })}
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid>
                      <Grid item md={12} xs={12}>
                        <DropzoneArea
                          maxFileSize={500000}
                          filesLimit={10}
                          dropzoneText="Upload Your Certifications up to 10 Images (Supported format : .jpeg .jpg .png) Certificate's Link will be visible in your company's Profile"
                          acceptedFiles={[".png", ".jpeg", ".jpg"]}
                          onChange={handleChangeDropZone}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                 */}
                </TabPanel>
                <TabPanel value="5">

                <Grid container spacing={3}>
                    <Grid>
                      <Grid item md={12} xs={12}>
                        <DropzoneArea
                          maxFileSize={500000}
                          filesLimit={1}
                          dropzoneText="Upload  Your  Brochure  up  to  1  file  (Supported format : .pdf)  Brochure's  Link  will  be  visible  in  your  company's  Profile Brochure's will be updated in your stall."
                          acceptedFiles={[".pdf"]}
                          onChange={handleChangeDropZone}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* <Grid item md={12} xs={12}>
                    <h2>Uploaded Catalogues</h2>
                    <Grid item md={12} xs={12} className={classes.avatarimage}>
                      {values.fileurl.map((url, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "75px",
                              margin: "0px 3px",
                            }}
                          >
                            <Avatar
                              key={index}
                              className={classes.green}
                              onClick={() =>
                                setConfirmDialog({
                                  isOpen: true,
                                  title:
                                    "Are you sure you want to Delete this catalogue?",
                                  subTitle:
                                    "Once deleted, you can't undo this action",
                                  onConfirm: () => {
                                    deleteCatalogueDialogConfirmation(url);
                                  },
                                })
                              }
                            >
                              <AssignmentIcon />
                            </Avatar>
                            <span style={{ overflowWrap: "break-word" }}>
                              {getFileName(url)}
                            </span>
                          </div>
                        );
                      })}
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid>
                      <Grid item md={12} xs={12}>
                        <DropzoneArea
                          maxFileSize={50000000}
                          filesLimit={5}
                          dropzoneText="(Previously uploaded documents will be removed) Upload Your product's Catalogue up to Five (Supported format : .jpeg .jpg .png .pdf) Product's Catalogue Link will be visible in your company's Profile"
                          acceptedFiles={[".png", ".jpeg", ".jpg", ".pdf"]}
                          onChange={handleFileChangeDropZone}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                */}
                </TabPanel>
              </TabContext>
            </div>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
                color="primary"
                variant="contained"
                onClick={() => onUpdateDetails()}
              >
                Update details
              </Button>
            {/* {spin ? (
              <CircularProgress
                color="secondary"
                style={{ margin: "5px" }}
                size={20}
              />
            ) : (
              ""
            )}
            {tabValue == 4 ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => onUploadCertificationsWithAWS()}
              >
                Add/Update Certificate
              </Button>
            ) : tabValue == 5 ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => onUploadFilesWithAWS()}
              >
                Upload Product Catalogue
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => onUpdateDetails()}
              >
                Update details
              </Button>
            )} */}
          </Box>
        </Card>
      </form>
                 
            <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialogfunc} />
            <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
    </div>
  );

  function onUpdateDetails() {
    setSpin(true);
    if (stallBanner) {
      let myPromise = new Promise((resolve, reject) => {
        const myGuid = guid();
        const storageUrl = firebase
          .app()
          .storage("gs://aepc-india.appspot.com");
        const storageRef = storageUrl.ref();

        const uploadTask = storageRef.child(myGuid).put(stallBanner);
        uploadTask.on(
          "state_changed",
          (snapShot) => {},
          (err) => {
            //catches the errors
            console.log(err);
            reject(err);
          },
          () => {
            firebase
              .app()
              .storage("gs://aepc-india.appspot.com")
              .ref()
              .child(myGuid)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                setStallBannerUrl((prevObject) => ({
                  ...prevObject,
                  imgUrl: fireBaseUrl,
                }));
                resolve(fireBaseUrl);
              });
          }
        );
      });
      myPromise.then((url) => {
        const databaseQuery = new Promise((accept, cancel) => {
          const firestore = firebase.firestore();

          firestore
            .collection("users")
            .doc(docid)
            .set(
              {
                companyName: values.developername,
                description: values.companyprofile,
                contactNo: values.contactnumber,
                establishedYear: values.establishedyear,
                noofCertificates: values.noofcertificates,
                productCategory: MultipaleProduct,
                website: values.website,
                exportCountry: values.country,
                market: values.market,
                brands: values.brands,
                socialMediaPrivacy: values.socialmediavisibility,
                stallBanner: url,
                contactVisibility: values.contactvisibility,
                stallVisibility: values.stallvisibility,
                stallPassword: values.stallvisibility
                  ? ""
                  : values.stallPassword,
                fbLink: values.fblink,
                whatsappNumber: values.whatsappnumber,
                alternateNumber: values.alternatenumber,
                contactEmail: values.contactemail,
                igLink: values.iglink,
                pinterestLink: values.pinterestlink,
                twitterLink: values.twitterlink,
                linkedinLink: values.linkedinlink,
                availableFrom: values.availableFrom,
                availableTo: values.availableTo,
                city: values.city,
                state: values.state,
                address: values.address,
              },
              { merge: true }
            )
            .then(() => {
              accept("Done");
            })
            .catch((err) => {
              cancel(err);
              setSpin(false);
            });
        });
        databaseQuery
          .then((saveResult) => {
            setAlertDialog({ isOpen: true, title: "Updated successfully!" });
          })
          .catch((err) => {
            console.log(err);
            setSpin(false);
          });
      });
    } else {
      const databaseQuery = new Promise((accept, cancel) => {
        const firestore = firebase.firestore();

        firestore
          .collection("users")
          .doc(docid)
          .set(
            {
              companyName: values.developername,
              description: values.companyprofile,
              contactNo: values.contactnumber,
              establishedYear: values.establishedyear,
              noofCertificates: values.noofcertificates,
              productCategory: MultipaleProduct,
              website: values.website,
              exportCountry: values.country,
              market: values.market,
              brands: values.brands,
              socialMediaPrivacy: values.socialmediavisibility,

              contactVisibility: values.contactvisibility,
              stallVisibility: values.stallvisibility,
              stallPassword:
                values.stallvisibility == "false" ? values.stallPassword : "",
              fbLink: values.fblink,
              whatsappNumber: values.whatsappnumber,
              alternateNumber: values.alternatenumber,
              contactEmail: values.contactemail,
              igLink: values.iglink,
              pinterestLink: values.pinterestlink,
              twitterLink: values.twitterlink,
              linkedinLink: values.linkedinlink,
              availableFrom: values.availableFrom,
              availableTo: values.availableTo,
              city: values.city,
              state: values.state,
              address: values.address,
            },
            { merge: true }
          )
          .then(() => {
            accept("Done");
          })
          .catch((err) => {
            cancel(err);
            setSpin(false);
          });
      });
      databaseQuery
        .then((saveResult) => {
          setAlertDialog({ isOpen: true, title: "Updated successfully!" });
          setSpin(false);
        })
        .catch((err) => {
          console.log(err);
          setSpin(false);
        });
    }

    setProfileCompletionFunc();
  }
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return String(
    s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
  );
}

StallDetailedForm.propTypes = {
  className: PropTypes.string,
};

export default StallDetailedForm;
