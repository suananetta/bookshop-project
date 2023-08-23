
function Button({btnClass, btnName, disabled, onClick, btnID, tooltipID, tooltip}) {
    return (
        <button 
            className={btnClass} 
            id={btnID} 
            disabled={disabled} 
            onClick={onClick}
            data-tooltip-id={tooltipID}
            data-tooltip-content={tooltip}
        >
            {btnName}
        </button>
    )
}

export default Button;