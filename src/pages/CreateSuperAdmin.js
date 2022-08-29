import { useEffect, useState } from 'react';
import { Container, Stack, Typography, Button, Grid, Avatar, Card, IconButton, TextField, Box, LinearProgress, MenuItem } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { createHotelAdmin, registerHotel } from '../service/HotelService';
import Page from '../components/Page';
import { getMasterData } from '../service/shared/LocalStorage';
import { createSuperAdmin } from '../service/UserService';

export default function CreateSuperAdmin() {
    const navigate = useNavigate();

    const { state } = useLocation();

    const [adminInfo, setAdminInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        phoneNumber: "",
        nationality: "",
        password: "",
        addressRegion: "",
        addressCity: "",
        addressStreet: "",
        addressHouseNumber: "",
        addressPoBox: "",
        isLoading: false
    })

    const handleAdminSubmit = async () => {
        setAdminInfo({
            ...adminInfo,
            isLoading: true
        });

        const result = await createSuperAdmin({
            user: {
                firstName: adminInfo.firstName,
                middleName: adminInfo.middleName,
                lastName: adminInfo.lastName,
                dateOfBirth: adminInfo.dateOfBirth,
                gender: adminInfo.gender,
                email: adminInfo.email,
                phoneNumber: adminInfo.phoneNumber,
                nationality: adminInfo.nationality,
                password: "12345",
                address: {
                    region: adminInfo.addressRegion,
                    city: adminInfo.addressCity,
                    street: adminInfo.addressStreet,
                    house_number: adminInfo.addressHouseNumber,
                    po_box: adminInfo.addressPoBox
                }
            }
        });

        if (result.status === "success") {
            navigate('/dashboard/user', { replace: true });
        }else{
            swal("Error while Creating Admin", `${result.message} \n\n Please Try again`);
          }

          setAdminInfo({
            ...adminInfo,
            isLoading: false
        });
    }

    const [masterData, setMasterData] = useState({})

    return (<Page title="Dashboard: Add New Hotel Admin">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Add New Admin
                </Typography>
            </Stack>
            <Stack>
                <Card>
                    <Box sx={{ width: '100%' }}>
                        {adminInfo.isLoading ? <LinearProgress /> : <></>}
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
                                required
                                id="outlined-required"
                                label="First Name"
                                defaultValue=""
                                value={adminInfo.firstName}
                                onChange={(e) => setAdminInfo({ ...adminInfo, firstName: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Middle Name"
                                defaultValue=""
                                value={adminInfo.middleName}
                                onChange={(e) => setAdminInfo({ ...adminInfo, middleName: e.target.value })}
                            />
                            <TextField
                                type="tel"
                                required
                                id="outlined-required"
                                label="Last Name"
                                defaultValue=""
                                value={adminInfo.lastName}
                                onChange={(e) => setAdminInfo({ ...adminInfo, lastName: e.target.value })}
                            />
                            <TextField
                                type="date"
                                required
                                id="outlined-required"
                                label="Date of Birth"
                                defaultValue=""
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                value={adminInfo.dateOfBirth}
                                onChange={(e) => setAdminInfo({ ...adminInfo, dateOfBirth: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                select
                                required
                                id="outlined-required"
                                label="Gender"
                                defaultValue=""
                                value={adminInfo.gender}
                                onChange={(e) => setAdminInfo({ ...adminInfo, gender: e.target.value })}
                            >
                                <MenuItem key="Male" value="Male">
                                    Male
                                </MenuItem>
                                <MenuItem key="Female" value="Female">
                                    Female
                                </MenuItem>
                            </TextField>
                            <TextField
                                type="email"
                                required
                                id="outlined-required"
                                label="Email Adresse"
                                defaultValue=""
                                value={adminInfo.email}
                                onChange={(e) => setAdminInfo({ ...adminInfo, email: e.target.value })}
                            />
                            <TextField
                                type="tel"
                                required
                                id="outlined-required"
                                label="Phone Number"
                                defaultValue=""
                                value={adminInfo.phoneNumber}
                                onChange={(e) => setAdminInfo({ ...adminInfo, phoneNumber: e.target.value })}
                            />
                            <TextField
                                select
                                required
                                id="outlined-required"
                                label="Nationality"
                                defaultValue=""
                                value={adminInfo.nationality}
                                onChange={(e) => setAdminInfo({ ...adminInfo, nationality: e.target.value })}
                            >
                                {
                                    getMasterData()?.nationalities[0]?.nationalities?.map((e) => {
                                       return (<MenuItem key={e.countryId} value={e.nationality}>
                                            {e.nationality}
                                        </MenuItem>)
                                    })
                                }
                            </TextField>
                            

                        </div>
                        <div>
                        <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Address Region"
                                defaultValue=""
                                value={adminInfo.addressRegion}
                                onChange={(e) => setAdminInfo({ ...adminInfo, addressRegion: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Address City"
                                defaultValue=""
                                value={adminInfo.addressCity}
                                onChange={(e) => setAdminInfo({ ...adminInfo, addressCity: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Address Street"
                                defaultValue=""
                                value={adminInfo.addressStreet}
                                onChange={(e) => setAdminInfo({ ...adminInfo, addressStreet: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Address House Number"
                                defaultValue=""
                                value={adminInfo.addressHouseNumber}
                                onChange={(e) => setAdminInfo({ ...adminInfo, addressHouseNumber: e.target.value })}
                            />
                            <TextField
                                type="text"
                                required
                                id="outlined-required"
                                label="Address Po.Box"
                                defaultValue=""
                                value={adminInfo.addressPoBox}
                                onChange={(e) => setAdminInfo({ ...adminInfo, addressPoBox: e.target.value })}
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
                            onClick={handleAdminSubmit}
                            disabled={adminInfo.isLoading}
                            variant="contained"
                            size="large"
                            component="label"
                        >{adminInfo.isLoading ? "Loading . . ." : "Save Admin"} </Button>
                    </Grid>
                    <br />
                    <br />
                </Card>
            </Stack>
        </Container>
    </Page>);
}