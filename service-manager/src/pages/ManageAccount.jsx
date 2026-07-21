import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from "./Login";
import Login from "./Login";

import {
    AccountCard,
    AccountHeader,
    UsernameSection,
    PasswordSection,
    FormsActions,
    ReturnButton,
    CustomDialog,
} from "../components/ManageAccount";


const DEFAULT_ACCOUNT = {
    username: DEFAULT_USERNAME,
    password: DEFAULT_PASSWORD,
};

const STORAGE_KEY = "service-manager-account";


function ManageAccount() {

  const navigate = useNavigate();

  const [savedAccount, setSavedAccount] = useState(() => {

    const saved = localStorage.getItem(STORAGE_KEY);

    return saved
      ? JSON.parse(saved)
      : DEFAULT_ACCOUNT;

  });

  const [formData, setFormData] = useState({

    username: savedAccount.username,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

  }); 

  const handleSave = () => {

    const usernameChanged =
        formData.username !== savedAccount.username;

    const passwordChanged =
        formData.newPassword.trim() !== "" ||
        formData.confirmPassword.trim() !== "";

    if (formData.username.trim() === "") {

        showDialog(
            "warning",
            "Username required",
            "Username cannot be empty!"
        );

        return;
    }

    if (!usernameChanged && !passwordChanged) {

        showDialog(
            "info",
            "No changes",
            "No changes detected."
        );

        return;
    }

    if (passwordChanged) {

        if (formData.currentPassword === "") {

            showDialog(
                "warning",
                "Current password",
                "Please enter your current password."
            );

            return;
        }

        if (formData.currentPassword !== savedAccount.password) {

            showDialog(
                "error",
                "Incorrect password",
                "The current password is incorrect!"
            );

            return;
        }

        if (formData.newPassword.trim() === "") {

            showDialog(
                "warning",
                "New password",
                "Please enter a new password."
            );

            return;
        }

        if (formData.confirmPassword.trim() === "") {

            showDialog(
                "warning",
                "Confirmation",
                "Please confirm the new password."
            );

            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {

            showDialog(
                "error",
                "Password mismatch",
                "The confirmation password does not match."
            );

            return;
        }
    }

    const updatedAccount = {

        username: formData.username,
        password: passwordChanged
            ? formData.newPassword
            : savedAccount.password,

    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedAccount)
    );

    setSavedAccount(updatedAccount);

    setFormData({

        username: updatedAccount.username,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",

    });

    showDialog(
        "success",
        "Success",
        "Account updated successfully."
    );

  };

  const handleDiscard = () => {

    setFormData({
        username: savedAccount.username,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

  };


  const updateField = (field, value) => {

      setFormData((prev) => ({

          ...prev,

          [field]: value,

      }));

  };

  const [dialog, setDialog] = useState({

    open: false,
    severity: "info",
    title: "",
    message: "",

  });

  const showDialog = (severity, title, message) => {

      setDialog({

          open: true,
          severity,
          title,
          message,

      });

  };

  const closeDialog = () => {

      setDialog((prev)=>({

          ...prev,

          open:false,

      }));

  };



  return (
    
      <>
        <ReturnButton onClick={() => navigate(-1)} />

        <div className="flex justify-center pt-[170px]">
          <AccountCard>

            <div className="pt-[45px] pl-[54px]">
            
              <AccountHeader />

              <UsernameSection 
                username={formData.username}
                onUsernameChange={(value) => updateField("username", value)}
              />

              <PasswordSection 
                currentPassword={formData.currentPassword}
                newPassword={formData.newPassword}
                confirmPassword={formData.confirmPassword}

                onCurrentPasswordChange={(value) => updateField("currentPassword", value)}

                onNewPasswordChange={(value) => updateField("newPassword", value)}

                onConfirmPasswordChange={(value) => updateField("confirmPassword", value)}      
              />

              <FormsActions 
                onSave={handleSave}
                onDiscard={handleDiscard}
              />

              <CustomDialog

                open={dialog.open}
                severity={dialog.severity}
                title={dialog.title}
                message={dialog.message}
                onClose={closeDialog}

              />
            
            </div>

          </AccountCard>
        </div>

      </>

  );
}

export default ManageAccount;