import React, { useState } from 'react';
import styled from 'styled-components';
import Selection from './SelectionIcon';

/*
props:
   id
   disableHighlighting
   copyMessage
*/

const EmbedLink = (props) => {
   const [ highlighted, setHighlighted ] = useState(false);
   const [ showTooltip, setShowTooltip ] = useState(false);
   const [ showWhiteFlash, setShowWhiteFlash ] = useState(false);

   if (props.id === undefined) {
      console.error('EmbedLink rendered without an id.  Please supply a stable ID so renderthis knows what to crop. EmbedLink will not render.');
      return props.children;
   }

   function showCopied () {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      if (!props.disableHighlighting) {
         setShowWhiteFlash(true);
         setTimeout(() => setShowWhiteFlash(false), 400);
      }
   }

   function copy () {
      navigator.clipboard.writeText(`https://renderthis.app/%23${props.id}/_/${window.location.href}`).then(() => {
         showCopied();
      });
   }

   const highlight = props.disableHighlighting
      ? () => {}
      : () => setHighlighted(true);

   return (
      <Parent highlighted={highlighted} onPointerLeave={() => { setHighlighted(false);} }>
         <WhiteScreen shown={showWhiteFlash} />
         <Tooltip showTooltip={showTooltip}>{props.copyMessage || 'Screenshot link copied to clipboard.'}</Tooltip>
         <EmbedPopover
            onClick={() => copy()}
            onPointerEnter={highlight}>
            <Selection/>
         </EmbedPopover>
         {props.children}
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
   @media (pointer: fine) {
      display: none;
   }
`;

const Parent = styled.div`
   position: relative;
   transition: box-shadow 0.3s ease-in-out;

   ${(props) => props.highlighted === true? `
   box-shadow: rgba(0, 0, 0, 0.176) 0px 16px 48px 0px;
   ` : ''}

   &:hover ${EmbedPopover} {
      display: block;
   }
`;
