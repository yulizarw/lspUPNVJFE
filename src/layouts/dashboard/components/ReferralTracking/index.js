import React from 'react';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function ReferralTracking(props) {
	const { info, gradients } = colors;
	const { cardContent } = gradients;
	const { allJadwal, jadwalPeserta, dataUser } = props
	// const position = [allJadwal.findAllJadwal[0].Tuk.lat, allJadwal.findAllJadwal[0].Tuk.long]

	// Fallback if `allJadwal.findAllJadwal` is empty or missing
	const position =
		allJadwal?.findAllJadwal?.length > 0
			? [allJadwal.findAllJadwal[0].Tuk.lat, allJadwal.findAllJadwal[0].Tuk.long]
			: [0, 0]; // Default position in case the data is missing

	const defaultDataUser = {
    namaPeserta:"",
    apl01: "",
    apl02: "",
    frAK01: "",
    BuktiPortfolio: [],
    updatedAt: new Date(),
    ...dataUser, // jika dataUser ada, maka akan meng-override nilai default
  };
	console.log(jadwalPeserta,'jadwal peserta')
	return (
		<Card
			sx={{
				height: '100%',
				background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
			}}>

			{allJadwal?.findAllJadwal?.length > 0 && defaultDataUser.namaPeserta.length > 0 && jadwalPeserta?.namaSkema && jadwalPeserta?.PesertaUjikoms[0].jadwalUjikomId ?
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
									{allJadwal.findAllJadwal[0].Tuk.lokasiTUK}
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
									{allJadwal.findAllJadwal[0].Tuk.namaTUK}
								</VuiTypography>
							</VuiBox>
						</Stack>

						<VuiBox sx={{ width: '100%', height: '250px' }}>
							<MapContainer center={position} zoom={20} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
								<Marker position={position}>
									<Popup>
										Lokasi: {allJadwal.findAllJadwal[0].Tuk.namaTUK} <br />
										Alamat: {allJadwal.findAllJadwal[0].Tuk.lokasiTUK}
									</Popup>
								</Marker>
							</MapContainer>
						</VuiBox>

						{/* <VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress
							variant='determinate'
							value={70}
							size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
							color='success'
						/>
						<VuiBox
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiTypography color='text' variant='button' mb='4px'>
									Safety
								</VuiTypography>
								<VuiTypography
									color='white'
									variant='d5'
									fontWeight='bold'
									mb='4px'
									sx={({ breakpoints }) => ({
										[breakpoints.only('xl')]: {
											fontSize: '32px'
										}
									})}>
									9.3
								</VuiTypography>
								<VuiTypography color='text' variant='button'>
									Total Score
								</VuiTypography>
							</VuiBox>
						</VuiBox>
					</VuiBox> */}
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
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

export default ReferralTracking;
