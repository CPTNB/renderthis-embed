import React, { useState } from 'react';
import styled from 'styled-components';

const EmbedLink = (props) => {
   const [ highlighted, setHighlighted ] = useState(false);
   if (props.id === undefined) {
      console.error('EmbedLink rendered without an id.  Please supply a stable ID so renderthis knows what to crop. EmbedLink will not render.');
      return props.children;
   }

   const highlightHandler = props.disableHighlighting
      ? () => {}
      : () => setHighlighted(true);
   
   return (
      <Parent highlighted={highlighted}>
         <EmbedPopover onPointerEnter={highlightHandler} onPointerLeave={() => setHighlighted(false)}>Embed this</EmbedPopover>
         {props.children}
      </Parent>
   )
}
export default EmbedLink;

const EmbedPopover = styled.div`
   position: absolute;
   top: 1em;
   z-index: 9999;
   background-color: white;
   cursor: pointer;
   color: red;
   display: none;
`;

const Parent = styled.div`
   position: relative;
   ${(props) => props.highlighted === true? 'border: 3px solid red;' : ''}

   &:hover ${EmbedPopover} {
      display: block;
      
   }
`;
