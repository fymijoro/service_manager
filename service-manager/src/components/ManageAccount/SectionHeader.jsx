function SectionHeader({
    title,
    lineWidth="170px" 
}) {
  return (
    <div className="flex items-center mt-8">

        <h2 className="
                font-roboto-slab
                text-[18px]
                font-bold 
                text-white 
                whitespace-nowrap
            "
        >
            
            {title}

        </h2>

        <div 
            className="
                ml-3
                border-t-[6px] 
                border-white
            "
            style={{width: lineWidth}} 
        />
    </div>
  );
}

export default SectionHeader;