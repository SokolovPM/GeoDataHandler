import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

class Layout extends Component {
  state = {
    src: '',
    filename: ''
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    reader.onloadend = () => {
      this.uploadRequest(reader.result, 'data.xls');
    };
    reader.readAsDataURL(file);
  }

  createLink = (src, filename) => {
    this.setState({ src, filename });
  };

  uploadRequest = (file, name) => {
    let data = new FormData();
    data.append('file', document);
    data.append('name', name);


    axios.post('/files', {
      name,
      file
    }, {
      responseType: 'blob'
    })
      .then(response => {
        console.log('response')
        const blob = new File([response.data], 'result.zip', {
          type: 'application/zip'
        });

        let filename = '';
        if (
          response.headers['content-disposition'] &&
          response.headers['content-disposition'].indexOf('attachment') !== -1
        ) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(
            response.headers['content-disposition']
          );
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        this.createLink(URL.createObjectURL(blob), filename);
        })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileUpload} />
        <p>
          {this.state.src &&
            <a
              href={this.state.src}
              target="_blank"
              rel="noopener noreferrer"
              download="result.zip"
            >
              download
            </a>
          }
        </p>
      </div>
    )
  }
}

export default Layout
