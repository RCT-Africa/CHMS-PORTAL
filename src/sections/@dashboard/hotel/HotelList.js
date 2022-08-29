import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ShopHotelCard from './HotelCard';

HotelLists.propTypes = {
  hotels: PropTypes.array.isRequired
};

export default function HotelLists({ hotels, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {hotels.map((hotel) => (
        <Grid key={hotel._id} item xs={12} sm={6} md={3}>
          <ShopHotelCard hotelList={hotel} />
        </Grid>
      ))}
    </Grid>
  );
}
