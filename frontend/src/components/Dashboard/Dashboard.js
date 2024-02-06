import React, { useState } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
// import csv from "csvtojson";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard({ setLoginUser }) {
  const { CSVReader } = useCSVReader();
  const [col, setCol] = useState([]);
  const [val, setVal] = useState([]);
  const [errorLogs, setErrorLogs] = useState([]);
  const validationHeaders = [
    "GROUP NAME*",
    "GROUP NUM*\n(nnnnnn)",
    "SUB-GROUP NUM*\n(nnnnnn)",
    "LAST NAME*\n**Must be entered on all family members (No punctuation)",
    "FIRST NAME*             (No punctuation)",
    "M/I",
    "Suffix",
    "DATE OF\nBIRTH*\n(yyyymmdd)",
    "MOBILE PHONE \n(no hypens)",
    "HOME PHONE\n(no hyphens)",
    "Work Phone\n(No hyphens)",
    "Email Address",
    "GENDER*\n(M / F)",
    "Subscriber SSN*",
    "MEMBER SSN \n(no hyphens)",
    "MAILING ADDRESS LINE 1*                              (No punctuation)",
    "MAILING ADDRESS LINE 2 (No puctuation)",
    "CITY*",
    "STATE*",
    "ZIP*",
    "Correspondence Addr Ln 1",
    "Correspondence Addr Ln 2",
    "Correspondence City*",
    "Correspondence State*",
    "Correspondence Zip*",
    "RELATIONSHIP* \n**Must List Employee first, then family members**",
    "PCP SELECTION*",
    "MEDICAL PLAN*",
    "MEDICAL BEGIN DATE*\n(yyyymmdd)",
    "MEDICAL END DATE*\n(yyyymmdd)",
    "ACU/CHIRO PLAN*",
    "ACU/CHIRO BEGIN DATE*\n(yyyymmdd)",
    "ACU/CHIRO END DATE*\n(yyyymmdd)",
    "DENTAL PLAN*",
    "DENTAL BEGIN DATE*\n(yyyymmdd)",
    "DENTAL END DATE*\n(yyyymmdd)",
    "VISION PLAN*",
    "VISION BEGIN DATE*\n(yyyymmdd)",
    "VISION END DATE*\n(yyyymmdd)",
    "Infertility Plan ",
    "Infertility Begin Date (yyyymmdd)",
    "Infertility End Date (yyyymmdd)",
    "Original Effective Date",
    "Language",
    "Existing patient of PCP?\n(not loaded)",
    "COMMENTS\n(Not loaded into system)"
  ];
  const handleFileUpload = (results) => {
    const value = results.data;
    value[0].push('Error Field')
    validationHeaders.map((header, i) => {
      if (value[0].indexOf(header) !== -1) {
      } else {
        setErrorLogs((oldValue) => [...oldValue, `${header} is NOT present in headers`])
      }
    })
    const filtered = value.filter((_, i) => i !== 0);
    setCol(value[0]);
    setVal(filtered);
  }
  return (
    <>
      <header className="header">
        <div className="logOutButton" onClick={() => setLoginUser({})}>
          Logout
        </div>
      </header>
      <body>
        <div>
          <CSVReader
            onUploadAccepted={handleFileUpload}
            config={{ worker: true }}
            noDrag
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
              Remove,
            }) => (
              <>
                <div {...getRootProps()}>
                  {acceptedFile ? (
                    <>
                      <div className="info-container">
                        <div className="file-info">
                          <p>{acceptedFile.name}</p>
                          <span>{formatFileSize(acceptedFile.size)}</span>
                        </div>
                        <div className="info__progress">
                          <ProgressBar />
                        </div>
                        <div {...getRemoveFileProps()} className="info__remove">
                          <Remove color={"red"} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <button>Upload file</button>
                  )}
                </div>

                <div className="tableWraper">
                  <div className="erro-wraper">
                    {errorLogs.map((errorEntry, i) => (<p className="error-logs">{i + 1}. {errorEntry}</p >))}
                  </div>
                  <table
                    style={{ display: "block", overflowX: "auto", fontSize: "20px" }}>
                    <thead>
                      <tr>
                        {col.length > 0 &&
                          col.map((col, i) => <th key={i}>{col}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {val.map((val, i) => (
                        <tr key={i}>
                          {val.map((v, i) => (
                            <td key={i}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CSVReader>
        </div>

      </body>

    </>
  );

}
