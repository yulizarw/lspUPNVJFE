import React from 'react';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import logoUPN from "../../assets/images/LOGO UPNVJ.svg"

function ReferralTrackingAsesor(props) {
	const { info, gradients } = colors;
	const { cardContent } = gradients;
	const { allJadwal, dataAsesor, dataUser, jadwalUjiUser } = props


	const defaultDataUser = {
		namaPeserta: "",
		apl01: "",
		apl02: "",
		frAK01: "",
		BuktiPortfolio: [],
		updatedAt: new Date(),
		...dataUser, // jika dataUser ada, maka akan meng-override nilai default
	};


	// mencari nama dan lokasi tuk


	// const matchingJadwal = allJadwal?.findAllJadwal?.find((jadwal) =>
	// 	jadwal.id === dataAsesor?.Asesor?.skemaUjikomId &&
	// 	jadwal?.JadwalUjikoms.some((jadwalUjikom) => jadwalUjikom.id === dataAsesor?.filterJadwal.id)
	// );
	const matchingJadwal = allJadwal?.findAllJadwal?.find((jadwal) => {
    if (
        jadwal?.id === dataAsesor?.Asesor?.skemaUjikomId &&
        Array.isArray(jadwal?.JadwalUjikoms)
    ) {
        return jadwal.JadwalUjikoms.some(
            (jadwalUjikom) => jadwalUjikom?.id === dataAsesor?.filterJadwal?.id
        );
    }
    return false;
});


	// Ambil data TUK jika ada
	const tukDetails = matchingJadwal?.Tuk || null;
	const position = tukDetails ? [parseFloat(tukDetails.lat), parseFloat(tukDetails.long)] : [0, 0];


	return (
		<Card
			sx={{
				height: '100%',
				background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
			}}>

			{tukDetails ?
				(<VuiBox sx={{ width: '100%' }}>
					<VuiBox
						display='flex'
						alignItems='center'
						justifyContent='space-beetween'
						sx={{ width: '100%' }}
						mb='10px'>
						<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
							Tempat Uji Kompetensi
						</VuiTypography>
						<VuiBox
							display='flex'
							justifyContent='center'
							alignItems='center'
							bgColor='#22234B'
							sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
							<FaEllipsisH color={info.main} size='18px' />
						</VuiBox>
					</VuiBox>
					<VuiBox
						display='flex'
						sx={({ breakpoints }) => ({
							[breakpoints.up('xs')]: {
								flexDirection: 'column',
								gap: '16px',
								justifyContent: 'center',
								alignItems: 'center'
							},
							[breakpoints.up('md')]: {
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}
						})}>
						<Stack
							direction='column'
							spacing='20px'
							width='500px'
							maxWidth='50%'
							sx={({ breakpoints }) => ({
								mr: 'auto',
								[breakpoints.only('md')]: {
									mr: '75px'
								},
								[breakpoints.only('xl')]: {
									width: '500px',
									maxWidth: '40%'
								}
							})}>
							<VuiBox
								display='flex'
								width='220px'
								p='20px 22px'
								flexDirection='column'
								sx={({ breakpoints }) => ({
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									[breakpoints.up('xl')]: {
										maxWidth: '110px !important'
									},
									[breakpoints.up('xxl')]: {
										minWidth: '180px',
										maxWidth: '100% !important'
									}
								})}>
								<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
									Alamat
								</VuiTypography>
								<VuiTypography color='white' variant='button' fontWeight='regular'>
									{tukDetails.lokasiTUK}
								</VuiTypography>
							</VuiBox>
							<VuiBox
								display='flex'
								width='220px'
								p='20px 22px'
								flexDirection='column'
								sx={({ breakpoints }) => ({
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									[breakpoints.up('xl')]: {
										maxWidth: '110px !important'
									},
									[breakpoints.up('xxl')]: {
										minWidth: '180px',
										maxWidth: '100% !important'
									}
								})}>
								<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
									Ruang
								</VuiTypography>
								<VuiTypography color='white' variant='button' fontWeight='regular'>
									{tukDetails.namaTUK}
								</VuiTypography>
							</VuiBox>
						</Stack>

						<VuiBox sx={{ width: '100%', height: '250px' }}>
							<MapContainer center={position} zoom={20} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								// url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"

								/>
								<Marker position={position}>
									<Popup>
										Lokasi: {tukDetails.namaTUK} <br />
										Alamat: {tukDetails.lokasiTUK}
									</Popup>
								</Marker>
							</MapContainer>
						</VuiBox>
					</VuiBox>
				</VuiBox>)
				: (<VuiBox sx={{ width: '100%' }}>
					<VuiBox
						display='flex'
						alignItems='center'
						justifyContent='space-beetween'
						sx={{ width: '100%' }}
						mb='10px'>
						<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
							Tempat Uji Kompetensi
						</VuiTypography>
						<VuiBox
							display='flex'
							justifyContent='center'
							alignItems='center'
							bgColor='#22234B'
							sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
							<FaEllipsisH color={info.main} size='18px' />
						</VuiBox>
					</VuiBox>
					<VuiBox
						display='flex'
						sx={({ breakpoints }) => ({
							[breakpoints.up('xs')]: {
								flexDirection: 'column',
								gap: '16px',
								justifyContent: 'center',
								alignItems: 'center'
							},
							[breakpoints.up('md')]: {
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}
						})}>
						<Stack
							direction='column'
							spacing='20px'
							width='500px'
							maxWidth='50%'
							sx={({ breakpoints }) => ({
								mr: 'auto',
								[breakpoints.only('md')]: {
									mr: '75px'
								},
								[breakpoints.only('xl')]: {
									width: '500px',
									maxWidth: '40%'
								}
							})}>
							<VuiBox
								display='flex'
								width='220px'
								p='20px 22px'
								flexDirection='column'
								sx={({ breakpoints }) => ({
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									[breakpoints.up('xl')]: {
										maxWidth: '110px !important'
									},
									[breakpoints.up('xxl')]: {
										minWidth: '180px',
										maxWidth: '100% !important'
									}
								})}>
								<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
									Alamat
								</VuiTypography>
								<VuiTypography color='white' variant='button' fontWeight='regular'>
									-
								</VuiTypography>
							</VuiBox>
							<VuiBox
								display='flex'
								width='220px'
								p='20px 22px'
								flexDirection='column'
								sx={({ breakpoints }) => ({
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									[breakpoints.up('xl')]: {
										maxWidth: '110px !important'
									},
									[breakpoints.up('xxl')]: {
										minWidth: '180px',
										maxWidth: '100% !important'
									}
								})}>
								<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
									Ruang
								</VuiTypography>
								<VuiTypography color='white' variant='button' fontWeight='regular'>
									-
								</VuiTypography>
							</VuiBox>
						</Stack>


						<VuiBox sx={{ width: '100%', height: '200px' }}>
							<MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
								/>
								<Marker position={position}>
									<Popup>
										Lokasi:- <br />
										Alamat:-
									</Popup>
								</Marker>
							</MapContainer>
						</VuiBox>



					</VuiBox>
				</VuiBox>)}

		</Card>
	);
}

export default ReferralTrackingAsesor;
