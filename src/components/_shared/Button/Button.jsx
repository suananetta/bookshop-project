
function Button({btnClass, btnName, disabled, onClick, btnID}) {
    return (
        <button className={btnClass} id={btnID} disabled={disabled} onClick={onClick}>
            {btnName}
        </button>
    )
}

export default Button;