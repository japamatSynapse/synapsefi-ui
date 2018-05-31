import styled, { css } from 'styled-components';
import Colors from '../../../colors';
import { search, check_filled_square } from '../../SvgIcons';
import { baseInputStyling } from '../../styles/Input.styles';

export const StyledCheckedSquare = styled(check_filled_square)`
  height: 20px;
  width: 20px;

  margin-right: 16px;
  border: 2px solid #8c8c8c;
  border: ${props => (props.selected && css`none`)};
  box-sizing: border-box;
  border-radius: 2px;

  path:first-of-type {
    fill: white;
    ${props => (props.selected && css`
      fill: ${Colors.TEAL};
      border: none;
    `)}
  }
`;

export const DropdownBar = styled.div`
  width: 288px;
  height: 40px;
  padding: 8px;

  background-color: transparent;
  border-bottom: 1px solid ${Colors.MEDIUM_GRAY};

  box-sizing: border-box;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownMenu = styled.div`
  width: inherit;

  margin-top: -40px;

  position: absolute;
  display: block;
  visibility: hidden;

  background-color: ${Colors.WHITE};

  overflow-y: hidden;
  overflow-x: hidden;

  visibility: ${props => props.showMenu && 'visible'};
  box-shadow: ${props => props.showMenu && '0 1px 3px 0 rgba(0, 0, 0, 0.5)'};

  z-index: 2;
`;

export const MenuList = styled.div`
  overflow-y: ${props => props.scrollable && 'scroll'};
  height: auto;
  max-height: ${props => (props.showMenu ? '200px' : '0px')};
  transition: max-height 0.2s ease-in;
`;

export const MenuItem = styled.div`
  box-sizing: border-box;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;

  display: flex;
  // justify-content: space-between;
  align-items: center

  color: ${Colors.DARK_NIGHT};
  background-color: ${Colors.WHITE};

  ${props => props.firstMenuItem ? `
    color: ${Colors.MEDIUM_GRAY};
    border-bottom: 1px solid transparent;
  ` : ''}
`;

export const TabItem = MenuItem.extend.attrs({
  tabIndex: '0',
})`
  &:hover, &:focus {
    outline: none;
    background-color: ${Colors.EVENING};
    color: ${Colors.SILK_WHITE};
  }

  ${props => (props.selected && css`
    outline: none;
    background-color: ${Colors.EVENING};
    color: ${Colors.SILK_WHITE};
  `)}
`;

export const DownArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;

  border-top: 6px solid ${Colors.MEDIUM_GRAY};

  border-radius: 2px;

  display: flex;
  align-self: center;
`;

export const PlaceHolder = styled.span`
  color: ${props => props.empty && Colors.WARM_LIGHT};
  font-size: 16px;
  width: 100%;
`;

export const DropdownContainer = styled.div`
  width: 288px;
  position: relative;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  ${baseInputStyling}

  border-width: 0px;
  height: 100%;
  margin-bottom: 0px;
  font-size: 16px;

  outline: none;

  width: 85%;
`;

export const FlexStartAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 16px;

  color: ${props => props.empty && Colors.WARM_LIGHT};
`;

export const StyledSearchIcon = styled(search)`
  width: 16px;
  height: 16px;
  fill: ${Colors.WARM_LIGHT};
`;