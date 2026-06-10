import {useNavigate} from "react-router-dom";

function Button({text,to,onClick,type = "button",disabled = false}){
    const navigate = useNavigate();

    const
    if(onClick)
    return(
        <button
            onClick={() => navigate(to)}
            className={`h-15 w-50 border border-white/10 hover:bg-cyan-300`}
        >
            {text}
        </button>
    );
}

export default Button;