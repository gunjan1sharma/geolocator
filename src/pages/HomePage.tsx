import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Pagination,
  Slider,
  TextField,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DownloadImage from "../assets/images/download.png";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Root } from "../extras/types";
import SingleComponent from "../components/SingleComponent";
import ImageComponent from "../components/ImageComponent";
import { v4 as uuidv4 } from "uuid";

import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";
import { Link } from "react-router-dom";
import ReactJson from "react-json-view";

const regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const BASE_API_IP = "https://api.ipify.org?format=json";
const BASE_API_URL =
  "http://192.168.1.88:9999/extras/v1/api/parsing/ip-to-geolocation?ip=";

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
    getDefaultIPAddress();
    return () => {};
  }, [colorContex.color]);

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

    if (ipAddress === "" || !ipAddress.startsWith("https://www")) {
      alert("A Valid Website URL[https://www] is Required!!");
      return;
    }

    window.open(ipAddress, "_blank");
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
    scrollRef.current.scrollIntoView();
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
        heading="Only screenshot capturer tool you need"
        desc="Ditch generic keywords and discover powerful, untapped gems with our advanced scraper. Say goodbye to endless brainstorming and hello to targeted content that dominates search engines. No more tedious manual research. Automate your keyword discovery, freeing up your time for crafting content that truly shines."
      />
      <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
        <TextField
          fullWidth
          sx={{ fontWeight: "bold" }}
          value={ipAddress}
          onChange={handleChange}
          id="url-input"
          label="Enter Website Link To Capture"
          variant="outlined"
        />

        <Button
          onClick={fetchDataFromServer}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Take Screenshot
        </Button>
        <Button
          onClick={visitWebsite}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Visit Website
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          A direct list of result will get triggered if file has only one format
          else a list of downloadable file will get presented.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked)} />
          <h3 className="text-xs text-center m-2">
            By capturing screenshot of 3rd party websites you agree to our terms
            & conditions for fair usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Whois Lookup Successful</h3>
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
            style={{ overflowX: "scroll" }}
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
