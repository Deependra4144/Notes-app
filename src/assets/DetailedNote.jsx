import { PropTypes } from 'prop-types'
function DetailedNote({ obj }) {
    console.log(obj)
    return (
        <>
            <div>
                <h3>{obj.task}</h3>
                <p>{obj.discription}</p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-danger">{obj.priority}</button>
                    <span>{obj.day}</span>
                </div>
            </div>
        </>
    )
}
DetailedNote.propTypes = {
    obj: PropTypes.shape({
        task: PropTypes.string.isRequired,
        discription: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
    }),
};
export default DetailedNote