import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import DownloadImage from "../assets/images/download.png";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Root } from "../extras/types";

import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";
import { Link } from "react-router-dom";
import ReactJson from "react-json-view";
const regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const BASE_API_IP = "https://api.ipify.org?format=json";
const BASE_API_URL =
  "https://appnor-backend.onrender.com/extras/v1/api/parsing/ip-to-geolocation?ip=";

const sampleResponse = {
  domain: "geekyants.com",
  domain_id: "1958120824_DOMAIN_COM-VRSN",
  status:
    "clientTransferProhibited https://icann.org/epp#clientTransferProhibited",
  create_date: "2015-09-07T06:19:28Z",
  update_date: "2023-08-01T04:31:34Z",
  expire_date: "2025-09-07T06:19:28Z",
  domain_age: 3048,
  whois_server: "whois.godaddy.com",
  registrar: {
    iana_id: "146",
    name: "GoDaddy.com, LLC",
    url: "https://www.godaddy.com",
  },
  registrant: {
    name: "Registration Private",
    organization: "Domains By Proxy, LLC",
    street_address: "DomainsByProxy.com",
    city: "Tempe",
    region: "Arizona",
    zip_code: "85284",
    country: "US",
    phone: "+1.4806242599",
    fax: "",
    email:
      "Select Contact Domain Holder link at https://www.godaddy.com/whois/results.aspx?domain=geekyants.com",
  },
  admin: {
    name: "Registration Private",
    organization: "Domains By Proxy, LLC",
    street_address: "DomainsByProxy.com",
    city: "Tempe",
    region: "Arizona",
    zip_code: "85284",
    country: "US",
    phone: "+1.4806242599",
    fax: "",
    email:
      "Select Contact Domain Holder link at https://www.godaddy.com/whois/results.aspx?domain=geekyants.com",
  },
  tech: {
    name: "Registration Private",
    organization: "Domains By Proxy, LLC",
    street_address: "DomainsByProxy.com",
    city: "Tempe",
    region: "Arizona",
    zip_code: "85284",
    country: "US",
    phone: "+1.4806242599",
    fax: "",
    email:
      "Select Contact Domain Holder link at https://www.godaddy.com/whois/results.aspx?domain=geekyants.com",
  },
  billing: {
    name: "",
    organization: "",
    street_address: "",
    city: "",
    region: "",
    zip_code: "",
    country: "",
    phone: "",
    fax: "",
    email: "",
  },
  nameservers: ["nora.ns.cloudflare.com", "zod.ns.cloudflare.com"],
};

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const [ipAddress, setIpAddress] = useState("");
  const [inVideoUrl, setInVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<any>();
  const [isTermsAggred, setIsTermsAggred] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    scrollToDiv();
    return () => {};
  }, [colorContex.point]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function getDefaultIPAddress() {
    axios
      .get(BASE_API_IP)
      .then((result) => {
        setIpAddress(result.data.ip);
        console.log(`IP Address fetched successfully.. ${result.data}`);
      })
      .catch((error) => {
        console.log("Error occured while fetching IP address : " + error);
      });
  }

  function fetchDataFromServer() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (!regex.test(ipAddress)) {
      alert("Please enter valid IP address for further processing..");
      return;
    }

    handleOpen();
    axios
      .get(BASE_API_URL + ipAddress)
      .then((result) => {
        setAudioResponse(result.data);
        setIsDownloadSuccess(true);

        handleClose();
        console.log(
          `Whois lookup data for ${ipAddress} performed successfully`
        );
      })
      .catch((error) => {
        console.log(
          "Something went wrong while looking for whois lookup data.."
        );
        alert("Something went wrong while looking for whois lookup data..");
        handleClose();
      });
  }

  function visitWebsite() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    window.open("https://myip-address.netlify.app/", "_blank");
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setIpAddress(event.target.value);
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
  }

  function scrollToDiv() {
    if (colorContex.point !== 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      colorContex.setPoint(0);
    }
  }

  function flattenResponse(response: Root): [string, any][] {
    const flattenedArray: [string, any][] = [];

    function flattenObject(obj: any) {
      for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          flattenObject(obj[key]);
        } else {
          flattenedArray.push([key, obj[key]]);
        }
      }
    }

    flattenObject(response);
    return flattenedArray;
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  function heading(key: string, value: string): JSX.Element {
    return (
      <Link target="_blank" to={value}>
        <h5 style={{ fontSize: "13px" }} className="text-black text-centre">
          {key}: <strong>{value}</strong>
        </h5>
      </Link>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="md:m-10 sm:m-5 flex flex-col items-center justify-center"
    >
      {backdrop}
      <FeatureIntro
        heading="Unleash the Power of Location with Our FREE IP Lookup Tool!⚡"
        desc="Tired of struggling with expensive geo-targeting tools?  Say goodbye to hidden fees and embrace the power of precise location data, completely FREE! Simply enter any IP address and watch our lightning-fast tool unlock a treasure trove of insights. Boost your marketing campaigns, personalize user experiences, and gain crucial intel on your audience – all without breaking the bank!"
      />
      <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
        <TextField
          fullWidth
          sx={{ fontWeight: "bold" }}
          value={ipAddress}
          onChange={handleChange}
          id="url-input"
          label="Enter Valid IP Address"
          variant="outlined"
        />

        <Button
          onClick={fetchDataFromServer}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Find GeoLocation
        </Button>
        <Button
          onClick={visitWebsite}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Get IP Address
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          You agree to use this tool for legitimate purposes only, respecting
          user privacy and avoiding misuse of location data.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked)} />
          <h3 className="text-xs text-center">
            We provide the data "as is" with no guarantees of accuracy or
            completeness.
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">
              GeoLocation Findings Successful
            </h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
        </div>
      )}

      {isDownloadSuccess && (
        <div className="w-screen">
          <ReactJson
            style={{ overflowX: "scroll", paddingRight: "10px" }}
            src={audioResponse}
            enableClipboard={true}
            displayObjectSize={true}
            displayDataTypes={false}
            theme={"colors"}
          />
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
