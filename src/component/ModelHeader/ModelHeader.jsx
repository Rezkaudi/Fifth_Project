import './ModelHeader.css'
import Copy from '../../assets/images/copy-duplicate-c2.svg'
import { Link } from 'react-router-dom'

import { Api } from '../../Api/Api'

const ModelHeader = ({ path, modelName, projectName }) => {

    // const userData = path.split('/')

    const copyUrl = async () => {
        const url = `${Api}/data/${modelName}/`
        try {
            await navigator.clipboard.writeText(url)
            alert("copy url successfully")

        } catch (err) {
            console.err(err);
        }
    }

    return (
        <header className='modelHeader'>
            <div className="left">
                <span className="modelName">{modelName}</span>
                <button title='copy url' onClick={copyUrl}>
                    <img src={Copy} alt="copy" />
                </button>
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