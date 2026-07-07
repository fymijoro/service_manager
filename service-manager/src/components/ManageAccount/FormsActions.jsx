import Button from "@mui/material/Button";

function FormsActions({ onSave, onDiscard }) {
  return (
    <div className="
        mt-10
        flex
        justify-end
        mr-8
        gap-4
        pr-[18px]
      "
    >

    <Button 
      variant="outlined"
      onClick={onDiscard}
      sx={{
        width: 96,
        height: 30,

        borderRadius: "20px",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",

        fontFamily: "Roboto Slab",
        fontWeight: 700,
        fontSize: "14px",

        textTransform: "none",

        transition: "all .2s ease",

        "&:hover": {
            borderColor: "#FFFFFF",
            backgroundColor: "#0A1338",
            transform: "translateY(-2px)",
        },
      }}
    >
      Discard
    </Button>

    <Button
      variant="contained"
      disableElevation
      onClick={onSave}
      sx={{
          width: 92,
          height: 30,

          borderRadius: "20px",
          border: "1px solid white",

          color: "#FFFFFF",

          fontFamily: "Roboto Slab",
          fontWeight: 700,
          fontSize: "14px",

          textTransform: "none",

          background:
              "linear-gradient(90deg,#0C8CE9 0%, #074F83 100%)",

          transition: "all .2s ease",

          "&:hover": {
              background:
                  "linear-gradient(90deg,#22A6FF 0%, #0C8CE9 100%)",

              transform: "translateY(-2px)",

              boxShadow:
                  "0 6px 18px rgba(12,140,233,.45)",
          },
      }}
      >
        Save

      </Button>

    </div>
  );
}

export default FormsActions;