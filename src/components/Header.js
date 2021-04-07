import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onToggle, showAdd }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd ? 'red':'green'} text={showAdd ? 'Close':'Add'} onClick={onToggle} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Tasker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;
