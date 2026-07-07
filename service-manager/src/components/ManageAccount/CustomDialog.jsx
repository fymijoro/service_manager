import ErrorOutlineIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

function CustomDialog({
    open,
    severity = "info",
    title,
    message,
    onClose,
}) {

    const colors = {
        error: "#EF4444",
        success: "#22C55E",
        warning: "#FACC15",
        info: "#0C8CE9",
    };

    const accent = colors[severity] || colors.info;

    const icons = {
        error: <ErrorOutlineIcon sx={{ fontSize: 34, color: accent }} />,
        success: <CheckCircleOutlineIcon sx={{ fontSize: 34, color: accent }} />,
        warning: <WarningAmberIcon sx={{ fontSize: 34, color: accent }} />,
        info: <InfoOutlinedIcon sx={{ fontSize: 34, color: accent }} />,
    };

    return (

        <Dialog
            open={open}
            onClose={onClose}

            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0,0,0,.60)",
                    },
                },

                paper: {
                    sx: {
                        bgcolor: "#081228",

                        color: "#F8FAFC",

                        border: "2px solid #0C8CE9",

                        borderRadius: "28px",

                        minWidth: 300,

                        boxShadow:
                            "0 25px 70px rgba(0,0,0,.75), 0 0 35px rgba(12,140,233,.35)",
                    },
                },
            }}
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    color: accent,
                    fontWeight: 700,
                    fontSize: 24,
                }}
            >
                {icons[severity]}

                {title}
            </DialogTitle>

            <DialogContent>

                <Typography>

                    {message}

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        borderRadius: "18px",
                        px: 4,
                        py: .8,
                        fontWeight: 700,
                        textTransform: "none",
                        backgroundColor: accent,

                        transition: ".25s",

                        "&:hover": {
                            backgroundColor: accent,
                            transform: "translateY(-2px)",
                            boxShadow: `0 0 20px ${accent}`,
                        },
                    }}
                >

                    OK

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default CustomDialog;