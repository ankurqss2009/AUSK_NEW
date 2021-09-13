import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ImageContainer = styled.div`
  display: flex;
  flex: 1 1 10%;
  align-items: center;
  width: 100%;
  height: 90%;
  vertical-align: middle;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1 1 10%;
  justify-content: flex-start;
  align-items: center;
`;

const CrossIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 30px;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 90%;
`;

const Image = styled(({ src, ...other }) => <img id="imgPreview" src={src} {...other} />)`
  height: 100%;
`;

// eslint-disable-next-line react/prop-types
const Header = ({ onClose }) => {
  return (
    <div>
      <IconContainer>
        <CrossIcon icon={faTimes} onClick={onClose} />
      </IconContainer>
    </div>
  );
};

const ImagePreview = ({ onClose, visible, path }) => {
  return (
    <Modal onRequestClose={onClose} isOpen={visible}>
      <ModalContainer>
        <Header onClose={onClose} />
        <ContentContainer>
          <ImageContainer>
            <Image src={path} />
          </ImageContainer>
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};

ImagePreview.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  path: PropTypes.string
};

export default ImagePreview;
