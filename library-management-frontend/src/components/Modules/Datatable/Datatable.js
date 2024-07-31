import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import "./Datatable.css";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function Datatable({
  handledelete,
  columns,
  data,
  tablename,
  hideDeleteOption = false,
}) {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("500px");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const options = {
    search: searchBtn,
    download: false, // Disable the default CSV export button
    customToolbar: () => (
      <>
        <Tooltip title="Export as CSV">
          <IconButton onClick={handleExportCSV} aria-label="Export as CSV">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
    print: true,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    delete: false, // Disable default deletion
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    textLabels: {
      body: {
        noMatch: <div className="text-danger">No Records Found</div>,
      },
    },
    onTableChange: (action, state) => {
      // console.log(action);
      // console.dir(state);
    },
    selectableRows: hideDeleteOption ? "none" : "multiple",
    onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
      const selectedRowIds = currentRowsSelected.map(
        (rowIndex) => data[rowIndex.dataIndex].id
      );
      // console.log("Selected Row IDs:", selectedRowIds);
      // setSelectedRows([selectedRowIds]);
    },
    onRowsDelete: handledelete,
  };

  // Function to handle custom CSV export
  const handleExportCSV = () => {
    const excludeColumns = ["Action"]; // Exclude the 'Action' column
    const updatedColumns = columns.filter(
      (column) => !excludeColumns.includes(column.name)
    );

    const options = {
      filename: "employee_data",
      separator: ",",
      excludeColumns: excludeColumns,
    };

    exportToCSV(data, updatedColumns, options);
  };

  // Function to export data to CSV
  const exportToCSV = (data, columns, options) => {
    if (data) {
      const csvData = data.map((row) =>
        columns.map((column) => row[column.name]).join(",")
      );
      const csvContent =
        columns.map((column) => column.label).join(",") +
        "\n" +
        csvData.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", options.filename + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <CacheProvider value={muiCache}>
      {/* <ThemeProvider theme={createTheme()}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Responsive Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={responsive}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => setResponsive(e.target.value)}
          >
            <MenuItem value={"vertical"}>vertical</MenuItem>
            <MenuItem value={"standard"}>standard</MenuItem>
            <MenuItem value={"simple"}>simple</MenuItem>

            <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
            <MenuItem value={"scrollMaxHeight"}>
              scrollMaxHeight (deprecated)
            </MenuItem>
            <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableBodyHeight}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => setTableBodyHeight(e.target.value)}
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Max Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableBodyMaxHeight}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setTableBodyMaxHeight(e.target.value)}
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Search Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setSearchBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Download Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={downloadBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setDownloadBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Print Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={printBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setPrintBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            View Column Button
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewColumnBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setViewColumnBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setFilterBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider> */}
      <MUIDataTable
        title={tablename}
        data={data}
        columns={columns}
        options={options}
      />
    </CacheProvider>
  );
}
