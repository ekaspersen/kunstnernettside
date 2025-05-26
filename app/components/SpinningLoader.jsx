// app/components/SpinningLoader.jsx - please use for all loading
import React from "react";

export const SpinningLoader = () => {
    return (
        <div
            className="w-[50px] h-[50px] border-[5px] border-[#584f3e] border-t-[#c1a061] rounded-full inline-block m-auto infinite animate-spin"
        />
    );
};
