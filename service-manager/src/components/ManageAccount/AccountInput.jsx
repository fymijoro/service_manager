import { useState } from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EditSquareIcon from "@mui/icons-material/EditSquare";

function AccountInput({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "...",
    width = "355px",
    rightIcon,
}) {

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type == "password";

    return (
        <div style={{ width }}>

            <label 
                className="
                    font-roboto-slab
                    text-[12px]
                    font-bold
                    text-white
                    mb-2
                    block
                "
            >
                {label}
            </label>

            <div className="relative mt-2">

                <input 
                    type={
                        isPassword ? (showPassword ? "text" : "password") : "text"
                    } 
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        w-full
                        h-12

                        rounded-[20px]
                        border

                        border-[#0C8CE9]
                        bg-[#050A24]

                        pl-10
                        pr-12

                        text-[16px]
                        text-white
                        font-roboto-slab

                        outline-none
                    "
                />
                {
                    isPassword ? (
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                text-white
                            "
                        >
                            {
                                showPassword ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>
                            }
                        </button>
                    ) : (
                        <div
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2

                                text-white
                                cursor-pointer
                            "
                        >
                            {rightIcon}
                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default AccountInput;

