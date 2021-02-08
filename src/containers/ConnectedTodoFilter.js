import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterTodo } from "../actions";
import TodoFilter from "../components/TodoFilter";

function mapStateToProps(state) {
  const { filter } = state;
  return { filter };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterTodo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
