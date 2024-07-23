import {Link} from 'react-router-dom'
function Link1(props) {
    return (
        <span className="font-semibold leading-6 text-blue hover:text-buttom">
            <Link to={props.route} >
                {props.Nlink}
            </Link>
        </span>
    )
}

export default Link1