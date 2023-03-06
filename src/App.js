import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import {useDispatch,useSelector} from 'react-redux';
import {getWarehouseInfo,selectCapacityInfo} from './reducers/capacitySlice';

function App() {
  const dispatch = useDispatch();
  const capacityinfo = useSelector(selectCapacityInfo);

  useEffect(()=>{
    dispatch(getWarehouseInfo());
  },[dispatch])
  
  return (
    <div>
      Hello World
      <Button variant="contained" onClick={() => dispatch(getWarehouseInfo())}>Get Info</Button>
      <ul>
        {
        capacityinfo.map((shed)=>{
          return <li key={shed.id}>{shed.id}</li>
        })}
      </ul>
    </div>
    
  );
}

export default App;
