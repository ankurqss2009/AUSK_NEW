import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';
import { Row, Col, Table, Button } from '@gqlapp/look-client-react';
import styled from 'styled-components';
import ImagePreview from './ImagePreview.web';

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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled(({ src, ...other }) => <img src={src} {...other} />)`
  position: absolute;
  left: 0;
  border: none;
  max-width: 195px;
  max-height: 195px;
`;

const UploadView = ({ values: { pictures }, loading, handleUploadFiles, handleRemoveFile, t }) => {
  const [images, setImages] = useState([]),
    [imagePreview, setImagePreview] = useState({ visible: false, path: '' });

  const onDrop = files => {
    setImages(files);
  };
  const onPreviewImage = path => {
    setImagePreview({ visible: true, path: path });
  };
  const onClose = () => {
    setImagePreview({ visible: false, path: '' });
  };
  const columns = [
    {
      title: t('table.column.name'),
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <a href={window.location.origin + '/' + record.path} download={text}>
            {text} ({filesize(record.size)})
          </a>
        );
      }
    },
    {
      title: t('table.column.image'),
      dataIndex: 'image',
      key: 'image',
      render(text, record) {
        return (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onPreviewImage(window.location.origin + '/' + record.path);
            }}
          >
            {t('preview')}
          </div>
        );
      }
    },
    {
      title: t('table.column.actions'),
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
    <>
      <LayOut>
        <div className="text-center">
          <Row>
            <Col xs={4}>
              <Dropzone onDrop={onDrop}>
                {images[0] && images[0].preview ? (
                  <Image src={images[0] && images[0].preview} />
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
          {!!images.length && (
            <Row>
              <Col xs={2}>
                <ButtonContainer>
                  <Button
                    color="primary"
                    onClick={e => {
                      e.stopPropagation();
                      images.length && handleUploadFiles(images);
                      setImages([]);
                    }}
                  >
                    {t('upload')}
                  </Button>
                  <Button
                    color="primary"
                    style={{ marginLeft: '2px' }}
                    onClick={() => onPreviewImage(images[0].preview)}
                  >
                    {t('preview')}
                  </Button>
                </ButtonContainer>
              </Col>
            </Row>
          )}
        </div>
      </LayOut>
      {imagePreview.visible && <ImagePreview {...imagePreview} onClose={onClose} />}
    </>
  );
};

UploadView.propTypes = {
  files: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleUploadFiles: PropTypes.func.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  t: PropTypes.func,
  values: PropTypes.object,
  pictures: PropTypes.array
};

export default UploadView;
