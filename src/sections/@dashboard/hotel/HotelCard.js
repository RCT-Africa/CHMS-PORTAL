import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, CardActionArea, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';
import { getHotelDetail } from '../../../service/HotelService';

const HotelImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ShopHotelCard.propTypes = {
  hotel: PropTypes.object,
};

export default function ShopHotelCard({ hotelList }) {
  const navigate = useNavigate();
  const { name, hotelLogo, address, noOfStar, isDisabled } = hotelList;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    const result = await getHotelDetail({
      hotelId: hotelList.hotelId
    });

    if (result.status === "success") {
      navigate('/dashboard/hoteldetail', { state: { hotelDetail: result.hotelInfo[0], userDetails: result.users.receptionists, adminDetails: result.users.admins } });
    }

    setIsLoading(false);
  }

  return (
    <Card>
      {isLoading ? <LinearProgress /> : <></>}
      <CardActionArea onClick={handleClick}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {(
            <Box
              color={'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
              }}
            >
              <Box sx={{backgroundColor: 'primary.dark', borderRadius:'10px', padding:'2px 10px 0px 10px'}}>
                {
                  Array.from({ length: noOfStar }, (item, index) =>
                    <StarIcon sx={{ color: 'gold' }} fontSize="small" />)
                }
              </Box>
            </Box>
          )}
          <HotelImgStyle height='10px' alt={name} src={hotelList?.logoImage ?? 'https://www.iconpacks.net/icons/2/free-hotel-icon-1880-thumb.png'} />

        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                }}
              >
                {address.street}, {address.city}, {address.region}
              </Typography>
              &nbsp;
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>

    </Card>
  );
}
