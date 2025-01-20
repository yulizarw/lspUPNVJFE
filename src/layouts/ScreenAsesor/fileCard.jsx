// import React from "react";
// import VuiBox from "components/VuiBox";
// import VuiTypography from "components/VuiTypography";
// import VuiButton from "components/VuiButton";
// import { Card, Grid } from "@mui/material";

// function FileCard({ file, access_token }) {
//   return (
//     <Grid item xs={12} sm={6} md={4} lg={3}>
//       <Card style={{ padding: "20px", marginBottom: "20px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
//         <VuiBox>
//           <VuiTypography variant="h6" color="textPrimary" fontWeight="bold">
//             {file.namaSkema}
//           </VuiTypography>
//           <VuiTypography variant="body2" color="textSecondary" mt={1}>
//             Nama File: {file.fileName}
//           </VuiTypography>

//           <a
//             href={`http://localhost:3001/asesor/downloadFileMUK/${file.fileName}?access_token=${access_token}`}
//             download={file.fileName}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <VuiButton variant="contained" color="info" fullWidth style={{ marginTop: "10px" }}>
//               Download File
//             </VuiButton>
//           </a>
//         </VuiBox>
//       </Card>
//     </Grid>
//   );
// }

// export default FileCard;
import React from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { Card, Grid } from "@mui/material";

function FileCard({ file, access_token }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex", padding: "10px" }}>
      <Card style={{ padding: "20px", display: "flex", flexDirection: "column", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "100%", height: "100%" }}>
        <VuiBox style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          {/* Left part: Display Skema name */}
          <VuiBox>
            <VuiTypography variant="h6" color="textPrimary" fontWeight="bold">
              {file.namaSkema}
            </VuiTypography>
            <VuiTypography variant="body2" color="textSecondary" mt={1}>
              Nama File: {file.fileName}
            </VuiTypography>
          </VuiBox>

          {/* Right part: Download Button */}
          <VuiBox style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
            <a
              href={`http://localhost:3001/asesor/downloadFileMUK/${file.fileName}?access_token=${access_token}`}
              download={file.fileName}
              target="_blank"
              rel="noopener noreferrer"
            >
              <VuiButton variant="contained" color="info" fullWidth style={{ marginTop: "10px", width: "120px" }}>
                Download
              </VuiButton>
            </a>
          </VuiBox>
        </VuiBox>
      </Card>
    </Grid>
  );
}

export default FileCard;
