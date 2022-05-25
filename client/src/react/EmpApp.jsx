import React from "react";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
function EmpApp() {
  const [data, setData] = React.useState([]);
  const getData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log("res", res);
    res.data.forEach(
      (row) => (row.Score = Math.floor(Math.random() * row.id * 1000))
    );
    setData(res.data);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Full name",
      width: 150,
    },
    {
      field: "Score",
      headerName: "Score",
    },
  ];
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item height={700}>
          <DataGrid columns={columns} rows={data} />
        </Grid>
      </Grid>
    </>
  );
}

export default EmpApp;
