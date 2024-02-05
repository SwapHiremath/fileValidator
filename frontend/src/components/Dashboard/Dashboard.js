import React, { useState } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import csv from "csvtojson";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard({ setLoginUser }) {
  const { CSVReader } = useCSVReader();
  const [col, setCol] = useState([]);
  const [val, setVal] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  const handleCSVInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      csv()
        .fromStream(e.target.result)
        .subscribe(
          (json) => {
            setJsonData(json);
            console.log("jsonData", json);
          },
          () => {}, //onerror
          () => {} //oncomplete
        );
    };
    reader.readAsText(file);
  };

  return (
    <>
      <header>
        <div className="logOutButton" onClick={() => setLoginUser({})}>
          Logout
        </div>
      </header>
      <div>
        <input type="file" accept=".csv" onChange={handleCSVInputChange} />

        {jsonData ? (
          <div className="json-container">
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        ) : (
          <p>Please select a CSV file.</p>
        )}
      </div>

      {/* <CSVReader
        onUploadAccepted={(results) => {
          console.log("dsds", results);
          const value = results.data;
          const filtered = value.filter((_, i) => i !== 0);
          setCol(value[0]);
          setVal(filtered);
          let fileData = {
            fileName: "SampleCSVDatafile",
            fileData: JSON.stringify(JSON.parse(value)),
          };
          axios
            .post("http://localhost:9002/uploadFileData", fileData)
            .then((res) => {
              alert(res.data.message);
            });
        }}
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
                    <div>
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
            <table
              style={{ display: "block", overflowX: "auto", fontSize: "20px" }}
            >
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
          </>
        )}
      </CSVReader> */}
    </>
  );
}
