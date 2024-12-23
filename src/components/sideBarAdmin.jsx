import React, { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";

// import LogoAves from "../asset/LOGO_UPN_Tanpa_Kutip.png"

const SidebarAdmin = (props) => {
  const history = useHistory();
  const { signOut } = props;

  useEffect(() => {
    const trees = window.$('[data-widget="treeview"]');
    trees.Treeview("init");
  });
// hidupkan juika sudah ada login
const userLogin = useSelector((state) => state.userReducers.userLogin);


  return (

    <aside className="main-sidebar sidebar-light-primary elevation-4">

      <Link to="/home" className="brand-link">
        <p style={{ marginBottom: 30 }}>
          <img
            // src={LogoAves}
            alt="UPN Logo"
            className="brand-image  elevation-0,5"
            style={{ opacity: 1, width: 50, height: 500 }}

          />
        </p>
        {/* <span className="brand-text font-weight-light">  </span> */}
      </Link>
      <div className="sidebar">

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">

          <div className="image">
            <img
              src={
                props.avatar
                  ? props.avatar
                  : "/adminlte/dist/img/user2-160x160.jpg"
              }
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          
          {/* {userLogin.role == 'Kaprodi' && (
            <div className="info">
              <Link to="/home" className="d-block">
                {userLogin.namaKaprodi ? userLogin.namaKaprodi : "Ketua Program Studi"}

              </Link>
            </div>
          )} */}
          {/* {userLogin.role == 'Mahasiswa' && (
            <div className="info">
              <Link to="/home" className="d-block">

                {userLogin.namaMahasiswa ? userLogin.namaMahasiswa : 'Mahasiswa'}
              </Link>
            </div>
          )}
      
           {userLogin.role == 'Pembimbing Instansi' && (
            <div className="info">
              <Link to="/home" className="d-block">

                {userLogin.namaPembimbing? userLogin.namaPembimbing : 'Pembimbing Instansi'}
              </Link>
            </div>
          )}
          {userLogin.role == 'Dikjar' && (
            <div className="info">
              <Link to="/home" className="d-block">

                {userLogin.namaDikjar ? userLogin.namaDikjar : 'Tenaga Kependidikan FT'}
              </Link>
            </div>
          )}
          {userLogin.role == 'Dekanat' && (
            <div className="info">
              <Link to="/home" className="d-block">

                {userLogin.namaDekanat ? userLogin.namaDekanat : 'Dekanat FT'}
              </Link>
            </div>
          )} */}
        </div>
        <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Data Desa <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/data-desa/struktur" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Struktur Organisasi</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/data-desa/daerah" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Daerah Administrasi</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/data-desa/pendapatan" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Pendapatan Daerah</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/data-desa/laporan" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Laporan Pengelola Desa</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Daerah<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Administrasi</p>
                    </Link>
                  </li>

                </ul>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Daerah Pariwisata</p>
                    </Link>
                  </li>

                </ul>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Daerah Industri</p>
                    </Link>
                  </li>

                </ul>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Daerah Pemukiman</p>
                    </Link>
                  </li>

                </ul>
                
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Kependudukan<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/kependudukan/data" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Data Kependudukan</p>
                    </Link>
                  </li>

                </ul>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/kependudukan/penerima-bantuan" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Daftar Penerima Bantuan</p>
                    </Link>
                  </li>

                </ul>
                
                
              </li>

              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>


        {/* {userLogin.role == "Kaprodi" && (
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Kelola Surat<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                 
                  <li className="nav-item">
                    <Link to="/kaprodi/surat" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Lihat Surat Pengesahan</p>
                    </Link>
                  </li>

                </ul>
              </li>


              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>
        )} */}

        {/* {!userLogin.role && (
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >

              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>
        )} */}

        {/* {userLogin.role == 'Mahasiswa' &&

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Buat Surat Pengajuan <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/ajukan-PKL" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Pengajuan PKL</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Tinjau Pengajuan Surat<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Pengajuan PKL</p>
                    </Link>
                  </li>

                </ul>
              </li>

              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>
        } */}

        {/* {userLogin.role == 'Dikjar' &&

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Surat Pengajuan PKL <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>

           

                </ul>
                <ul className="nav nav-treeview" style={{ display: "none" }}>

                  <li className="nav-item">
                    <Link to="/dikjar/tinjau-surat-instansi" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Tinjau Surat PKL Ke Instansi</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Surat Keputusan PKL<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Buat Surat Keputusan</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Tinjau Surat Keputusan</p>
                    </Link>
                  </li>

                </ul>
              </li>

              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>
        } */}

        {/* {userLogin.role == 'Dekanat' &&

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Surat Pengajuan PKL <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>

                <ul className="nav nav-treeview" style={{ display: "none" }}>

                  <li className="nav-item">
                    <Link to="/dekanat/tinjau-PKL" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Tinjau Surat PKL Ke Instansi</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Surat Keputusan PKL<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>

                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Tinjau Surat Keputusan</p>
                    </Link>
                  </li>

                </ul>
              </li>

              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>
        } */}

        {/* {userLogin.role == 'Pembimbing Instansi' &&

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Surat Pengajuan PKL <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>

                <ul className="nav nav-treeview" style={{ display: "none" }}>

                  <li className="nav-item">
                    <Link to="/pembimbing-instansi/tinjau-PKL" className="nav-link">
                      <i className="fas fa-list-alt nav-icon"></i>
                      <p>Tinjau Surat PKL Ke Instansi</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                  <p>
                    Surat Keputusan PKL<i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: "none" }}>

                  <li className="nav-item">
                    <Link to="/mahasiswa/status-PKL" className="nav-link">
                      <i className="fas fa-list nav-icon"></i>
                      <p>Tinjau Surat Keputusan</p>
                    </Link>
                  </li>

                </ul>
              </li>

              <button className="btn btn-danger" type="button" onClick={signOut}>
                <Link className="text-light" to="/">
                  Keluar
                </Link>
              </button>
            </ul>
          </nav>
        } */}
      </div>
    </aside>
  );
};

export default SidebarAdmin;