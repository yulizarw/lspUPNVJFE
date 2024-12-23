import React, { Component } from 'react'
import {
  Link,
} from "react-router-dom";

export default class FooterAdmin extends Component {
    render() {
        return (
            <footer className="main-footer">
            <strong>Copyright &copy; 2021 <Link to="Home">Fakultas Teknik</Link>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
              <b>Beta Version</b> 1.0.0 
            </div>
          </footer>
        )
    }
}