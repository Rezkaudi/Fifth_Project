import './ModelHeader.css'
import { Link } from 'react-router-dom'
import CopyApiModal from '../CopyApiModal/CopyApiModal'
const ModelHeader = ({ path, modelName, projectName }) => {

  
    return (
        <header className='modelHeader'>
            <div className="left">
                <span className="modelName">{modelName}</span>
                <CopyApiModal modelName={modelName}/>
                <div className="path">{path}</div>
            </div>
            <div className="right">
                <button className='createNew'>
                    <Link to={`/account/${projectName}/${modelName}/addRow`}>+ Add Data</Link>
                </button>
                {/* <AddDataModal content={" + Add Data"} modelName={modelName} projectName={projectName} /> */}
            </div>
        </header>

    )
}

export default ModelHeader