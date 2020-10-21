import { connect } from 'react-redux';
import Main from './Main.view.jsx'
import { allByesSelector, allHisSelector } from "../../../redux/reducers/records";
import { sayBye, sayHi } from "../../../db/actions/records";


function mapStateToProps(state, ownProps) {
  const his = allHisSelector(state);
  const byes = allByesSelector(state);

  return {
    his,
    byes
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    sayBye: () => dispatch(sayBye()),
    sayHi: () => dispatch(sayHi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
