import {combineReducers} from 'redux' ;
import User_Reducer from './users_reducer';
import Record_Reducer from './records_reducer';

const rootReducer = combineReducers({
    user:User_Reducer,
    record:Record_Reducer
   
}) ;
export default rootReducer ;