import {connect} from 'react-redux';
import {Switch} from 'react-router';

const mapStateToProps = state => {
	console.log('Switch')
	console.log(state)
	return {location: state};
};

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default ConnectedSwitch;