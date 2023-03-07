import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import {useDispatch,useSelector} from 'react-redux';
import {getWarehouseInfo,getFreeBoxInfo,selectCapacityInfo} from './reducers/capacitySlice';
import Header from './components/Header';
import HeroContents from './components/HeroContents';
import BoxGrid from './components/BoxGrid';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function App() {
  const dispatch = useDispatch();
  const capacityinfo = useSelector(selectCapacityInfo);

  useEffect(()=>{
    dispatch(getWarehouseInfo());
    dispatch(getFreeBoxInfo());
  },[dispatch])

  
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Header />
      <HeroContents />
      {/* End hero unit */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-start">
          {capacityinfo.map((shed,index) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={shed.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={`shed${index}`}
                  subheader={`location:(${parseInt(shed.location.x.$numberDecimal)},${parseInt(shed.location.y.$numberDecimal)})`}
                  titleTypographyProps={{ align: 'center' }}
                  action={'hello'}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      Boxes
                    </Typography>
                  </Box>
                  <BoxGrid index={index}/>
                </CardContent>
                <CardActions>
                  <Button fullWidth>
                    Test
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
