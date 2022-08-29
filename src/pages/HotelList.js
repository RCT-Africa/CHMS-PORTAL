import { useEffect, useState } from 'react';
import { Container, Stack, Typography, Button, LinearProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getHotelList } from '../service/HotelService';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { HotelSort, HotelLists, HotelCartWidget, HotelFilterSidebar } from '../sections/@dashboard/hotel';

export default function HotelList() {

  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const getHotels = async () => {
      const hotelList = await getHotelList();
      setHotelList(hotelList.hotels)
      setIsLoading(false);
    }
    getHotels();
  }, []);

  return (
    <Page title="Dashboard: Hotels">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hotel
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/addnewhotel" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Hotel
          </Button>
        </Stack>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <HotelFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <HotelSort />
          </Stack>
        </Stack> */}

        {isLoading ? <LinearProgress /> : <></>}

        <HotelLists hotels={hotelList} />
      </Container>
    </Page>
  );
}
