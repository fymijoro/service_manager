import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function AccountHeader() {
  return (
    <div className="flex items-center gap-2">
      <ManageAccountsIcon
        sx={{
          fontSize: 47,
          color: "#FFFFFF",
        }}
      />

      <h1 className="
            font-roboto-slab 
            text-[28px] 
            font-bold 
            text-white
        ">
        Manage account
      </h1>
    </div>
  );
}

export default AccountHeader;