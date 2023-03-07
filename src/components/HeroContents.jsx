import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const HeroContents = () => {
    return (
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          WareHouse
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          You can use WareHouse here
        </Typography>
      </Container>
    )
}

export default HeroContents;