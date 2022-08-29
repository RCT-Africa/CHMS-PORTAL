import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Container, Stack, Typography, Button, Grid, Avatar, IconButton, TextField, Box, LinearProgress, InputLabel, Card,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { changeHotelAdminStatus, changeHotelStatus, getHotelDetail, registerHotel } from '../service/HotelService';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HotelUserList from './HotelUserList';

export default function HotelDetail() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [hotelInfo, setHotelInfo] = useState({
        hotelLogoImage: state.hotelDetail.logoImage,
        hotelId: state.hotelDetail.hotelId,
        isDisabled: state.hotelDetail.isDisabled,
        hotelName: state.hotelDetail.name,
        hotelEmail: state.hotelDetail.email,
        hotelPhoneNumber: state.hotelDetail.phoneNumber,
        hotelStar: state.hotelDetail.noOfStar,
        hotelNumberOfRooms: state.hotelDetail.noOfRoom,
        hotelRegion: state.hotelDetail.address.region,
        hotelCity: state.hotelDetail.address.city,
        hotelStreet: state.hotelDetail.address.street,
        hotelHouseNumber: state.hotelDetail.address.houseNumber,
        hotelPoBox: state.hotelDetail.address.poBox,
        hotelBusinessLicenseNumber: state.hotelDetail.businessLicenseNumber,
        hotelBusinessLicenseImage: state.hotelDetail.businessLicenseImage,
    })

    const [userDetail, setUserDetail] = useState(state.userDetails);
    const [adminDetail, setAdminDetail] = useState(state.adminDetails);

    const [hotelDetailState, setHotelDetailState] = useState({
        isEdit: false,
        isLoading: false, 
        isUserListLoading : false
    })


    const handleHotelSubmit = async () => {
        setHotelDetailState({
            ...hotelDetailState,
            isLoading: true
        });

        //   const result =  await registerHotel({
        //         "hotel": {
        //             "name": hotelInfo.hotelName,
        //             "email": hotelInfo.hotelEmail,
        //             "phoneNumber": hotelInfo.hotelPhoneNumber,
        //             "noOfStar": hotelInfo.hotelStar,
        //             "noOfRoom": hotelInfo.hotelNumberOfRooms,
        //             "address": {
        //                 "region": hotelInfo.hotelRegion,
        //                 "city": hotelInfo.hotelCity,
        //                 "street": hotelInfo.hotelStreet,
        //                 "houseNumber": hotelInfo.hotelHouseNumber,
        //                 "poBox": hotelInfo.hotelPoBox
        //             },
        //             "businessLicenseNumber": hotelInfo.hotelBusinessLicenseNumber,
        //             "businessLicenseImage": hotelInfo.hotelBusinessLicenseImage,
        //         }
        //     });

        // if(result.status === "success")
        // {
        setTimeout(() => {
            setHotelDetailState({
                ...hotelDetailState,
                isLoading: false
            });
            navigate('/dashboard/hotellist', { replace: true });
        }, 5000);

        // }
    }

    const handleDisableHotel = async () => {
        setHotelDetailState({
            ...hotelDetailState,
            isLoading: true,
        });

        const result = await changeHotelStatus({
            hotelId: hotelInfo.hotelId,
            isDisabled: !hotelInfo.isDisabled
        });

        if (result.status === "success") {
            setHotelInfo(
                {
                    ...hotelInfo,
                    isDisabled: !hotelInfo.isDisabled
                }
            )
        }

        setHotelDetailState({
            ...hotelDetailState,
            isLoading: false,
        });
    }

    const handleDisableHotelAdmin = async (selectedUserId, userIsDisabled) => {
        setHotelDetailState({
            ...hotelDetailState,
            isUserListLoading: true,
        });

        const result = await changeHotelAdminStatus({
            userId: selectedUserId,
            isDisabled: !userIsDisabled
        });

        if(result.status === "success"){
            const result = await getHotelDetail({
                hotelId : hotelInfo.hotelId
              });

              setAdminDetail(result.users.admins)
        }

        setHotelDetailState({
            ...hotelDetailState,
            isUserListLoading: false,
        });
    }


    const handleImageUploadCapture = ({ target }) => {
        setHotelInfo({
            hotelLogoImage: []
        });

        const fileReader = new FileReader();

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setHotelInfo({...hotelInfo,
                hotelLogoImage: [...hotelInfo.hotelLogoImage, e.target.result]
            });
        };
    };

    return (<Page title="Dashboard: Hotel Detail">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Hotel Detail
                </Typography>
            </Stack>
            <Stack>
                <Card>
                    <Box sx={{ width: '100%' }}>
                        {hotelDetailState.isLoading ? <LinearProgress /> : <></>}
                    </Box>
                    <br />
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item  >
                            <Avatar sx={{ width: 150, height: 150 }} alt="" src={hotelInfo?.hotelLogoImage ?? 'https://www.iconpacks.net/icons/2/free-hotel-icon-1880-thumb.png'} />
                            {
                                hotelDetailState.isEdit ? <IconButton sx={{ mt: -10, ml: 14 }} color="primary" aria-label="upload picture" component="label">
                                    <input onChange={handleImageUploadCapture} hidden accept="image/*" type="file" />
                                    <PhotoCamera color="action" />
                                </IconButton> : <></>
                            }

                        </Grid>
                    </Grid><Box display="flex" justifyContent="flex-end">
                        <Box >
                            <IconButton variant="outlined" onClick={() => {
                                setHotelDetailState({
                                    ...hotelDetailState,
                                    isEdit: !hotelDetailState.isEdit
                                })
                            }} sx={{
                                mt: '-225px',
                                mr: '30px'
                            }}>
                                {hotelDetailState.isEdit ? <CloseIcon fontSize='medium' /> : <EditIcon fontSize='medium' />}
                            </IconButton>
                            <br />
                            <IconButton onClick={handleDisableHotel} sx={{
                                mt: '-140px',
                                mr: '30px'
                            }}>
                                {hotelInfo.isDisabled ? <CheckCircleIcon sx={{ color: 'green' }} fontSize='medium' /> : < RemoveCircleOutlineIcon sx={{ color: 'red' }} fontSize='medium' />}
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        {hotelDetailState.isEdit ? <></> : <Box>
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                }}
                            >
                                Hotel Status : {" "}
                            </Typography>
                            {hotelInfo.isDisabled ? <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'red',
                                    textDecoration: 'bold'
                                }}
                            >
                                {" "} Disbaled
                            </Typography> : <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'green',
                                    textDecoration: 'bold'
                                }}
                            >
                                {" "} Active
                            </Typography>}
                        </Box>
                        }
                    </Box>
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
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Name"
                                defaultValue=""
                                value={hotelInfo.hotelName}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelName: e.target.value })}
                            />

                            <TextField
                                type="email"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Email"
                                defaultValue=""
                                value={hotelInfo.hotelEmail}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelEmail: e.target.value })}
                            />
                            <TextField
                                type="tel"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Phone Number"
                                defaultValue=""
                                value={hotelInfo.hotelPhoneNumber}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelPhoneNumber: e.target.value })}
                            />
                            <TextField
                                type="number"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
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
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Number Of Room"
                                defaultValue=""
                                value={hotelInfo.hotelNumberOfRooms}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelNumberOfRooms: e.target.value })}
                            />
                            <TextField
                                type="text"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Address Region"
                                defaultValue=""
                                value={hotelInfo.hotelRegion}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelRegion: e.target.value })}
                            />
                            <TextField
                                type="text"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Address City"
                                defaultValue=""
                                value={hotelInfo.hotelCity}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelCity: e.target.value })}
                            />
                            <TextField
                                type="text"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
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
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Address House Number"
                                defaultValue=""
                                value={hotelInfo.hotelHouseNumber}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelHouseNumber: e.target.value })}
                            />
                            <TextField
                                type="text"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Address Po.Box"
                                defaultValue=""
                                value={hotelInfo.hotelPoBox}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelPoBox: e.target.value })}
                            />
                            <TextField
                                type="text"
                                variant={hotelDetailState.isEdit ? "outlined" : "standard"}
                                disabled={!hotelDetailState.isEdit}
                                style={{ paddingTop: '10px' }}
                                InputProps={{
                                    disableUnderline: !hotelDetailState.isEdit,
                                }}
                                id="outlined-required"
                                label="Hotel Business License Number "
                                defaultValue=""
                                value={hotelInfo.hotelBusinessLicenseNumber}
                                onChange={(e) => setHotelInfo({ ...hotelInfo, hotelBusinessLicenseNumber: e.target.value })}
                            />
                        </div>
                        <br />
                        {hotelDetailState.isEdit ? <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"> <Button
                                onClick={handleHotelSubmit}
                                disabled={hotelInfo.isLoading}
                                variant="contained"
                                size="large"
                                component="label"

                            >{hotelDetailState.isLoading ? "Loading . . ." : "Update Hotel"} </Button> </Grid> : <></>}
                    </Box>
                    <br />
                </Card>
            </Stack>
            <br />

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Hotel Admins
                </Typography>
                <Button variant="contained" onClick={(()=>{
                    navigate("/dashboard/addhoteladmin", {state : {selectedHotel : hotelInfo}})
                })} startIcon={<Iconify icon="eva:plus-fill" />}>
                     Add New Hotel Admin
                </Button>
            </Stack>
            
            <HotelUserList  userList={adminDetail} showAction onActionButtonClicked={handleDisableHotelAdmin} isLoading={hotelDetailState.isUserListLoading}/>

            <br />

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Hotel Receptions
                </Typography>
            </Stack>

            <HotelUserList  userList={userDetail} showAction={false}/>
        </Container>
    </Page>);
}