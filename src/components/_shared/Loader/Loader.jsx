import { FallingLines } from  'react-loader-spinner';

function Loader() {
    return (
        <FallingLines
            color="#756AD3"
            width="130"
            visible={true}
            ariaLabel='falling-lines-loading'
        />
    )
}

export default Loader;