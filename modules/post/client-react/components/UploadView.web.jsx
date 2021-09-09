import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import { Row, Col, Table, Button } from '@gqlapp/look-client-react';

const styles = {
  image: {
    position: 'absolute',
    left: '15px',
    border: 'none',
    maxWidth: '195px',
    maxHeight: '195px'
  }
};

// eslint-disable-next-line react/prop-types
const LayOut = ({ children }) => {
  return (
    <section className="d-flex flex-column flex-grow-1">
      <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
        <div className="container">{children}</div>
      </section>
    </section>
  );
};

const UploadView = ({ values: { pictures }, loading, handleUploadFiles, handleRemoveFile, t }) => {
  const [images, setImages] = useState([]);

  const onDrop = files => {
    setImages(files);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <a href={record.path} download={text}>
            {text} ({filesize(record.size)})
          </a>
        );
      }
    },
    {
      title: 'Action',
      key: 'actions',
      width: 50,
      render(text, record) {
        return (
          <Button color="primary" size="sm" onClick={() => handleRemoveFile(record.id)}>
            {t('table.btnDel')}
          </Button>
        );
      }
    }
  ];

  return (
    <LayOut>
      <div className="text-center">
        <Row>
          <Col xs={4}>
            <Dropzone onDrop={onDrop}>
              {images[0] && images[0].preview ? (
                <img id="imgPreview" src={images[0] && images[0].preview} style={styles.image} />
              ) : (
                <p>{t('message')}</p>
              )}
            </Dropzone>
          </Col>
          <Col xs={8}>
            {loading && <span>Loading...</span>}
            {pictures && <Table dataSource={pictures} columns={columns} />}
          </Col>
        </Row>
      </div>
      <div className="text-center mt-3 ml-3">
        <Row>
          <Col xs={2}>
            <Button
              color="primary"
              onClick={e => {
                e.stopPropagation();
                images.length && handleUploadFiles(images);
                setImages([]);
              }}
            >
              Upload
            </Button>
          </Col>
        </Row>
      </div>
    </LayOut>
  );
};

UploadView.propTypes = {
  files: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleUploadFiles: PropTypes.func.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  t: PropTypes.func,
  pictures: PropTypes.array
};

export default UploadView;
