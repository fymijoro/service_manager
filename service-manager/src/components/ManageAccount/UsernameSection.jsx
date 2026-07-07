import { useState } from "react";

import SectionHeader from "./SectionHeader";
import AccountInput from "./AccountInput";

import EditSquareIcon from "@mui/icons-material/EditSquare";

function UsernameSection({
    username,
    onUsernameChange,
}){

    return (
        <section className="mt-[20px]">

            <SectionHeader title="Change Username" lineWidth="185px"/>

            <div className="mt-2">
                <AccountInput 
                    label="Username"
                    value={username}
                    onChange={(e) => onUsernameChange(e.target.value)}
                    rightIcon={<EditSquareIcon fontSize="small" />}
                />
            </div>

        </section>
    );
}

export default UsernameSection;