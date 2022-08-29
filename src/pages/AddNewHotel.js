import { useState } from 'react';
import { Container, Stack, Typography, Button, Grid, Avatar, Card, IconButton, TextField, Box, LinearProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { registerHotel } from '../service/HotelService';
import Page from '../components/Page';

export default function AddNewHotel() {
    const navigate = useNavigate();
    const [hotelInfo, setHotelInfo] = useState({
        hotelLogoImage: '',
        hotelName: '',
        hotelEmail: '',
        hotelPhoneNumber: '',
        hotelStar: '',
        hotelNumberOfRooms: '',
        hotelRegion: "",
        hotelCity: "",
        hotelStreet: "",
        hotelHouseNumber: "",
        hotelPoBox: "",
        hotelBusinessLicenseNumber: "",
        hotelBusinessLicenseImage: "",
        isLoading: false
    })

    const handleImageUploadCapture = ({ target }) => {
        setHotelInfo({
            hotelLogoImage: []
        });

        const fileReader = new FileReader();

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setHotelInfo((hotelState) => ({
                hotelLogoImage: e.target.result
            }));
        };
    };

    const handleHotelSubmit = async () => {
        setHotelInfo({
            ...hotelInfo,
            isLoading: true
        });

      const result =  await registerHotel({
            hotel: {
                name: hotelInfo.hotelName,
                email: hotelInfo.hotelEmail,
                logoImage : hotelInfo.hotelLogoImage,
                phoneNumber: hotelInfo.hotelPhoneNumber,
                noOfStar: hotelInfo.hotelStar,
                noOfRoom: hotelInfo.hotelNumberOfRooms,
                address: {
                    region: hotelInfo.hotelRegion,
                    city: hotelInfo.hotelCity,
                    street: hotelInfo.hotelStreet,
                    houseNumber: hotelInfo.hotelHouseNumber,
                    poBox: hotelInfo.hotelPoBox
                },
                businessLicenseNumber: hotelInfo.hotelBusinessLicenseNumber,
                businessLicenseImage: hotelInfo.hotelBusinessLicenseImage,
            }
        });

        console.log(result)
        if(result.status === "success")
        {
            navigate('/dashboard/hotellist', { replace: true });
        }else{
            swal("Error while Creating Hotel", `${result.message} \n\n Please Try again`);
          }

          setHotelInfo({
            ...hotelInfo,
            isLoading: false
        });
    }

    return (<Page title="Dashboard: Add New Hotel">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Add New Hotel
                </Typography>
            </Stack>
            <Stack>
                <Card>
                    <Box sx={{ width: '100%' }}>
                        {hotelInfo.isLoading ? <LinearProgress /> : <></>}
                    </Box>
                    <br />
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item >
                            <Avatar sx={{ width: 120, height: 120 }} alt="Remy Sharp" src={hotelInfo.hotelLogoImage} />
                            <IconButton sx={{ mt: -10, ml: 11 }} color="primary" aria-label="upload picture" component="label">
                                <input onChange={handleImageUploadCapture} hidden accept="image/*" type="file" />
                                <PhotoCamera color="action" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <br />
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '26ch' },
                        }}

                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Name"
                                defaultValue=""
                                value={hotelInfo.hotelName}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelName: e.target.value })}
                            />
                            <TextField
                                type="email"
                                required
                                id="outlined-required"
                                label="Hotel Email"
                                defaultValue=""
                                value={hotelInfo.hotelEmail}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelEmail: e.target.value })}
                            />
                            <TextField
                                type="tel"
                                required
                                id="outlined-required"
                                label="Hotel Phone Number"
                                defaultValue=""
                                value={hotelInfo.hotelPhoneNumber}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelPhoneNumber: e.target.value })}
                            />
                            <TextField
                                type="number"
                                required
                                id="outlined-required"
                                label="Hotel Star"
                                defaultValue=""
                                value={hotelInfo.hotelStar}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelStar: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                type="number"
                                required
                                id="outlined-required"
                                label="Hotel Number Of Room"
                                defaultValue=""
                                value={hotelInfo.hotelNumberOfRooms}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelNumberOfRooms: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Address Region"
                                defaultValue=""
                                value={hotelInfo.hotelRegion}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelRegion: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Address City"
                                defaultValue=""
                                value={hotelInfo.hotelCity}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelCity: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Address Street"
                                defaultValue=""
                                value={hotelInfo.hotelStreet}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelStreet: e.target.value })}
                            />

                        </div>
                        <div>
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Address House Number"
                                defaultValue=""
                                value={hotelInfo.hotelHouseNumber}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelHouseNumber: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Address Po.Box"
                                defaultValue=""
                                value={hotelInfo.hotelPoBox}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelPoBox: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Hotel Business License Number "
                                defaultValue=""
                                value={hotelInfo.hotelBusinessLicenseNumber}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelBusinessLicenseNumber: e.target.value })}
                            />
                            <TextField
                                type="file"
                                required
                                id="outlined-required"
                                defaultValue=""
                                value={hotelInfo.hotelBusinessLicenseImage}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelBusinessLicenseImage: e.target.value })}
                            />

                        </div>
                    </Box>
                    <br />
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                        type="submit"
                            onClick={handleHotelSubmit}
                            disabled={hotelInfo.isLoading}
                            variant="contained"
                            size="large"
                            component="label"

                        >{hotelInfo.isLoading ? "Loading . . ." : "Save Hotel"} </Button>

                    </Grid>
                    <br />
                    <br />
                </Card>
            </Stack>
        </Container>
    </Page>);
}