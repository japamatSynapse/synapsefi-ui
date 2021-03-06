import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import colors from '../../colors';
import CloseButton from '../buttonRelated/CloseButton';
import ButtonGroup from '../buttonRelated/ButtonGroup';

const OuterBox = styled.div`
  background-color: ${props =>
    props.outerBgColor ? `${props.outerBgColor}` : 'rgba(255,255,255,.7)'};

  width: 100vw;
  height: 100vh;

  width: ${props => (props.outerWidth ? `${props.outerWidth}` : '100vw')};
  height: ${props => (props.outerHeight ? `${props.outerHeight}` : '100vh')};

  position: fixed;

  top: ${props => (props.outerTop ? `${props.outerTop}` : '0')};
  left: ${props => (props.outerLeft ? `${props.outerLeft}` : '0')};

  z-index: 100000;
`;

const InnerBoxPositioning = styled.div`
  position: absolute;
  top: ${props => (props.top ? `${props.top}` : '50%')};
  left: ${props => (props.left ? `${props.left}` : '50%')};
  transform: translate(-50%, -50%);
`;

const InnerBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  padding: 32px;
  background-color: ${props => (props.innerBgColor ? `${props.innerBgColor}` : '#fff')};

  width: ${props => (props.width ? `${props.width}` : 'auto')};
  height: ${props => (props.height ? `${props.height}` : 'auto')};

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px ${colors.WARM_LIGHT};
  border-radius: 4px;

  overflow: auto;
`;

const CloseButtonPositioning = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
`;

const HeaderText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.DARK_NIGHT};
  border-bottom: solid 1px ${colors.WARM_LIGHT};
  line-height: 1;
  padding-bottom: 24px;
  margin-bottom: 32px;
`;

const uniqId = 'uniq-modal-id';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.appendElement = this.appendElement.bind(this);
    this.openModal = this.openModal.bind(this);
    this.removeModalFromBodyTag = this.removeModalFromBodyTag.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.openModal(nextProps.children);
    } else {
      this.removeModalFromBodyTag();
    }
  }

  componentWillUnmount() {
    this.removeModalFromBodyTag();
  }

  appendElement() {
    this.modal = document.createElement('div');
    this.modal.id = uniqId;
    document.body.appendChild(this.modal);
  }

  openModal(children) {
    const {
      outerWidth,
      outerHeight,
      outerTop,
      outerLeft,
      //
      outerBgColor,
      innerBgColor,
      top,
      left,
      height,
      width,
      fullWidthBtn,
      headerText,
      btnObjs,
      inlineBtnStyle,
      closeModal,
    } = this.props;

    !document.getElementById(uniqId) && this.appendElement();
    document.body.style.overflow = 'hidden';

    return ReactDOM.createPortal(
      <OuterBox
        outerBgColor={outerBgColor}
        onClick={e => closeModal()}
        //
        outerWidth={outerWidth}
        outerHeight={outerHeight}
        outerTop={outerTop}
        outerLeft={outerLeft}
      >
        <InnerBoxPositioning top={top} left={left}>
          <InnerBox
            innerBgColor={innerBgColor}
            height={height}
            width={width}
            onClick={e => e.stopPropagation()}
          >
            <CloseButtonPositioning>
              <CloseButton onClick={() => closeModal()} size="16px" />
            </CloseButtonPositioning>
            {headerText && <HeaderText>{headerText}</HeaderText>}
            {children}
            {btnObjs &&
            btnObjs.length !== 0 && (
              <ButtonGroup btnObjs={btnObjs} fullWidthBtn={fullWidthBtn} bottom inlineBtnStyle={inlineBtnStyle}/>
            )}
          </InnerBox>
        </InnerBoxPositioning>
      </OuterBox>,
      this.modal
    );
  }

  removeModalFromBodyTag() {
    if (document.getElementById(uniqId) && this.modal) {
      document.body.removeChild(this.modal);
      document.body.style.overflow = 'auto';
    }
  }

  render() {
    if (this.props.isOpen) return this.openModal(this.props.children);
    return null;
  }
}

export default Modal;
