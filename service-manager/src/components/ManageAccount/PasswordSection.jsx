import { useState } from "react";

import SectionHeader from "./SectionHeader";
import AccountInput from "./AccountInput";

function PasswordSection({
    currentPassword,
    newPassword,
    confirmPassword,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,    
}){

    return (

        <section className="mt-8">

            <SectionHeader 
                title="Change password"
                lineWidth="190px"
            />

            <div className="mt-2 space-y-4">

                <AccountInput 
                    label="Current password"
                    type="password"
                    width="361px"
                    value={currentPassword}
                    onChange={(e) => onCurrentPasswordChange(e.target.value)}
                />

                <AccountInput 
                    label="New password"
                    type="password"
                    width="361px"
                    value={newPassword}
                    onChange={(e) => onNewPasswordChange(e.target.value)}
                />

                <AccountInput 
                    label="Confirm"
                    type="password"
                    width="361px"
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                />

            </div>

        </section>
    );

}

export default PasswordSection;