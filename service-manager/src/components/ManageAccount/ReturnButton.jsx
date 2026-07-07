import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function ReturnButton({ onClick }) {

    return (

        <button
            onClick={onClick}
            className="
                absolute

                left-[50px]
                top-[100px]

                flex
                items-center
                gap-2

                text-white

                font-roboto-slab
                text-[20px]
                font-normal

                transition-all
                duration-200

                hover:text-sky-300
                hover:-translate-x-1
            "
        >

            <ArrowCircleLeftIcon
                sx={{
                    fontSize: 24,
                }}
            />

            <span>Return</span>

        </button>

    );

}

export default ReturnButton;