function AccountCard({ children }) {
    return (
        <div
            className="
                w-[465px]
                h-[670px]
                rounded-[30px]
                border
                border-[#0C8CE9]
                bg-[#050A24]

                flex
                flex-col

                mb-[120px]
            "
        >
            {children}
        </div>
    );
}

export default AccountCard;