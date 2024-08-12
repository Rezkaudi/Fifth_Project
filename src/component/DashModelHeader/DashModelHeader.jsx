import './DashModelHeader.css'
import { Link } from "react-router-dom";

const DashModelHeader = ({ modelName }) => {
    return (
        <header className='dashModelHeader'>
            <div className="left">
                <span className="modelName">{modelName}</span>
            </div>
            <div className="right">
                <Link to="/account/schema">
                    <button>Schema</button>
                </Link>
            </div>
        </header>

    )
}

export default DashModelHeader