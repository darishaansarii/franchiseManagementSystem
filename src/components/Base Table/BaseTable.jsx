import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../../components/Base Container/BaseContainer.module.css";

export const BaseTable = ({
  headers,
  keys,
  rows,
  onDelete,
  editPath,
  btnText,
  btnNavigatePath,
  columnWidths = {},
  hideActions = false,
  currentUserId, 
  disableAdd = false, 
}) => {
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#780606",
      fontWeight: "bold",
      color: theme.palette.common.white,
      fontSize: "clamp(12px, 2vw, 16px)",
      letterSpacing: 1,
      whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "clamp(12px, 1.8vw, 14px)",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Box className={styles.baseContainer}>
      <Typography
        variant="h4"
        sx={{
          color: "#780606",
          fontWeight: "bolder",
          marginBottom: "20px",
        }}
      >
        View {btnText}
        {/(ch|sh|o|s)$/.test(btnText) ? "es" : "s"}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        <Table
          aria-label="customized table"
          sx={{ minWidth: 600, tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <StyledTableCell
                  key={i}
                  align="left"
                  sx={{ width: keys[i] === "review" ? "50%" : columnWidths[keys[i]] || "auto" }} 
                >
                  {header}
                </StyledTableCell>
              ))}
              {!hideActions && <StyledTableCell>Actions</StyledTableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {keys.map((key, i) => (
                  <StyledTableCell
                    key={i}
                    align="left"
                    sx={{ width: key === "review" ? "50%" : columnWidths[key] || "auto" }} 
                  >
                    {row[key] !== undefined && row[key] !== null
                      ? String(row[key])
                      : "_"}
                  </StyledTableCell>
                ))}
                {!hideActions && (
                  <StyledTableCell align="left">
                    {row.uid === currentUserId ? (
                      <Box sx={{ display: "flex", gap: "20px" }}>
                        <EditIcon
                          onClick={() => navigate(`${editPath}/${row.id}`)}
                          sx={{
                            color: "#e7c137",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                        <DeleteIcon
                          onClick={() => onDelete(row.id)}
                          sx={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    ) : (
                      "-" 
                    )}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!hideActions && (
        <Button
          sx={{
            marginTop: "10px !important",
            borderColor: "#780606",
            color: "#780606",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#780606",
              color: "#fff",
              borderColor: "#780606",
            },
          }}
          variant="outlined"
          fullWidth
          disabled={disableAdd}
          onClick={() => navigate(btnNavigatePath)}
        >
          Add {btnText}
        </Button>
      )}
    </Box>
  );
};
