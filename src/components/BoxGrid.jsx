import {useDispatch,useSelector} from 'react-redux';
import {takeboxAsync,appendBoxAsync,selectCapacityInfo,selectFreeBoxInfo} from '../reducers/capacitySlice';
import Grid from '@mui/material/Grid';
import React, { useState} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AddIcon from '@mui/icons-material/Add';


const BoxGrid = ({index}) => {
    const dispatch = useDispatch();
    const capacityinfo = useSelector(selectCapacityInfo);
    const freeboxinfo = useSelector(selectFreeBoxInfo);
    const currentShed = capacityinfo[index];
    const shedid = currentShed.id;
    const boxes = [];

    const [takebox_dialog_open,set_takebox_dialog_open] = useState(false);
    const [appendbox_dialog_open,set_appendbox_dialog_open] = useState(false);
    const [curBoxId,setBoxId] = useState();
    const [curShedIndex,setShedIndex] = useState();

    const handleTakeboxClickOpen = (boxid) => {
        set_takebox_dialog_open(true);
        setBoxId(boxid);
    }

    const handleTakebox = () => {
        const data = {
           boxId:curBoxId, 
        }
        dispatch(takeboxAsync(shedid,data));
        set_takebox_dialog_open(false);
        setBoxId();
    }

    const handleTakeboxCancel = () => {
        set_takebox_dialog_open(false);
    }

    const handleAppendboxClickOpen = (shedindex) => {
        set_appendbox_dialog_open(true);
        setShedIndex(shedindex);
    }

    const handleAppendbox = (boxid) => {
        const data = {
            boxId:boxid,
            index:curShedIndex
        };
        dispatch(appendBoxAsync(shedid,data))
        set_appendbox_dialog_open(false);
        setShedIndex();
    }

    const handleAppendboxCancel = () => {
        set_appendbox_dialog_open(false);
    }

    for (let i = 0; i < currentShed.capacity; i++){
        if (currentShed.unused_index.includes(i)){
            boxes.push({
                id:i,
                empty:true,
                productNum: null,
                assembled: null
            })
        } else {
            const result = currentShed.boxes.filter(box=>box.index===i)[0];
            boxes.push({
                id:result._id,
                empty:false,
                productNum:result.productNumber.slice(-3),
                assembled:result.assembled
            })
        }
    }
  return (
    <React.Fragment>
    <Grid container spacing={2}>
      {boxes.map((box,shedindex) => (
        <Grid
          item
          key={box.id}
          onClick = {box.empty ? ()=> handleAppendboxClickOpen(shedindex): ()=>handleTakeboxClickOpen(box.id)}
          sx={{ border: 1, backgroundColor:box.empty ? null :"red",cursor:"pointer"}}
          xs={12 / (currentShed.capacity / currentShed.rowNumber)}
          sm={12 / (currentShed.capacity / currentShed.rowNumber)}
          md={12 / (currentShed.capacity / currentShed.rowNumber)}
        >
          {
            box.empty
            ?
            "empty"
            :
            box.productNum
          }
        </Grid>
      ))}
    </Grid>
    <Dialog
        open={takebox_dialog_open}
        onClose={handleTakeboxCancel}
        aria-labelledby="takebox-title"
        aria-describedby="takebox-description"
      >
        <DialogTitle id="takebox-title">
          {"ボックスを取り出しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="takebox-description">
            この操作を確定するとボックスは該当の棚から取り出されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTakeboxCancel}>いいえ</Button>
          <Button onClick={handleTakebox} autoFocus>
            はい
          </Button>
        </DialogActions>
    </Dialog>

    <Dialog
        open={appendbox_dialog_open}
        onClose={handleAppendboxCancel}
        aria-labelledby="appendbox-title"
        aria-describedby="appendbox-description"
      >
        <DialogTitle id="appendbox-title">
          {"ボックスを追加しますか？"}
        </DialogTitle>
        <DialogContent>
        <List sx={{ pt: 0 }}>
        {freeboxinfo.map((freebox) => (
          <ListItem key={freebox._id} disableGutters>
            <ListItemButton onClick={()=>handleAppendbox(freebox._id)}>
            <ListItemText primary={freebox.productNumber} />
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            </ListItemButton>
          </ListItem>
        ))}
        </List>
        </DialogContent>
    </Dialog>

    </React.Fragment>
  );
};

export default BoxGrid;
