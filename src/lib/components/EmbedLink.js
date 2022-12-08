import React, { useState } from 'react';
import styled from 'styled-components';
import Selection from './SelectionIcon';

const EmbedLink = ({ id, tooltip, position, icon, disableHighlighting, flags, children }) => {
   const [ highlighted, setHighlighted ] = useState(false);
   const [ showTooltip, setShowTooltip ] = useState(false);
   const [ showWhiteFlash, setShowWhiteFlash ] = useState(false);

   if (id === undefined) {
      console.error('EmbedLink rendered without an id.  Please supply a stable ID so renderthis knows what to crop. EmbedLink will not render.');
      return children;
   }

   const usedTooltip = tooltip || <Tooltip left={position === 'left'} showTooltip={showTooltip}>
      Screenshot link copied to clipboard.
   </Tooltip>;

   const usedIcon = icon || <Selection/>;

   const highlight = disableHighlighting
      ? () => {}
      : () => setHighlighted(true);

   function showCopied () {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      if (!disableHighlighting) {
         setShowWhiteFlash(true);
         setTimeout(() => setShowWhiteFlash(false), 400);
      }
   }

   function copy () {
      navigator.clipboard.writeText(`https://renderthis.app/%23${id}/${flags || '_'}/${window.location.href}`).then(() => {
         showCopied();
      });
   }

   return (
      <Parent highlighted={highlighted} onPointerLeave={() => { setHighlighted(false);} }>
         <WhiteScreen shown={showWhiteFlash} />
         {usedTooltip}
         <EmbedPopover
            left={position === 'left'}
            onClick={() => copy()}
            onPointerEnter={highlight}>
            {usedIcon}
         </EmbedPopover>
         {children}
      </Parent>
   )
}
export default EmbedLink;

const WhiteScreen = styled.div`
   position: absolute;
   z-index: 9999;
   background-color: white;
   opacity: ${props => props.shown ? '0' : '1'};
   visibility: ${props => props.shown ? 'shown' : 'hidden'};
   transition: opacity 0.4s ease-out;
   width: 100%;
   height: 100%;
`;

const Tooltip = styled.div`
   position: absolute;
   z-index: 9999;
   font-size: 12px;
   line-height: 14px;
   top: -15px;
   ${props => props.left ? '' : 'right: 0px;'}
   padding-left: 2px;
   padding-right: 2px;
   background-color: black;
   color: white;
   display: ${props => props.showTooltip ? 'block' : 'none'};
`;

const EmbedPopover = styled.div`
   position: absolute;
   z-index: 9999;
   cursor: pointer;
   ${props => props.left ? '' : 'right: 0px;'}
   @media (pointer: fine) {
      display: none;
   }
`;

const Parent = styled.div`
   position: relative;
   // transition: box-shadow 0.3s ease-in-out;

   ${(props) => props.highlighted === true? `
   border: 5px dashed black;
   // box-shadow: rgba(0, 0, 0, 0.176) 0px 16px 48px 0px;
   ` : ''}

   &:hover ${EmbedPopover} {
      display: block;
   }
`;
