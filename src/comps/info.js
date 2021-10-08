import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";

function Info({ showInfo, severity, setLoading }) {
  const [closeAlert, setCloseAlert] = useState(true);

  useEffect(() => {
    if (showInfo) {
      setCloseAlert(true);
    }
    // setLoading(false);
  }, [showInfo]);

  return (
    <div>
      {showInfo && (
        <Snackbar
          open={closeAlert}
          autoHideDuration={6000}
          onClose={() => {
            setCloseAlert(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert variant="filled" severity={severity}>
            {showInfo}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Info;
