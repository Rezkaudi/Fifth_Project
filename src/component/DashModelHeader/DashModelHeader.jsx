import './DashModelHeader.css'
// import Copy from '../../assets/images/copy-duplicate-c2.svg'
import DeleteModelModal from '../DeleteModelModal/DeleteModelModal'

const DashModelHeader = ({ path, modelName }) => {
    return (
        <header className='dashModelHeader'>
            <div className="left">
                <span className="modelName">{modelName}</span>

                <DeleteModelModal modelName={modelName} />
                {/* <button title='copy url'>
                    <img src={Copy} alt="copy" />
                </button> */}
                <div className="path">{path}</div>
            </div>
            {/* <div className="right">
                <button>Save</button>
            </div> */}
        </header>

    )
}

export default DashModelHeader