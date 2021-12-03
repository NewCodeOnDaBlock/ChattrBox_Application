import { React, useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import './home.css';
// import ScrollToBottom from 'react-scroll-to-bottom';
// import Home from "./Home";
import leftLogo from '../images/chevron_left.png'
import rightLogo from '../images/chevron_right.png'

const OnlineList = ({ signinmessages, onlineListRef}) => { // destructured component data passed already

    const rightArrowRef = useRef();
    const leftArrowRef = useRef();
    const mainContainerRef = useRef();

    const closeTab = (e) => {
        const rightArrowRefNode = rightArrowRef.current;
        const leftArrowRefNode = leftArrowRef.current;
        const mainContainerRefNode = mainContainerRef.current;
        const onlineListRefNode = onlineListRef.current;

        rightArrowRefNode.style.display = 'none';
        leftArrowRefNode.style.display = 'block';
        mainContainerRefNode.classList.add('active')
        mainContainerRefNode.classList.remove('after');
        onlineListRefNode.classList.add('active')
        onlineListRefNode.classList.remove('after')
    }

    const openTab = (e) => {
        const rightArrowRefNode = rightArrowRef.current;
        const leftArrowRefNode = leftArrowRef.current;
        const mainContainerRefNode = mainContainerRef.current;
        const onlineListRefNode = onlineListRef.current;

        rightArrowRefNode.style.display = 'block';
        leftArrowRefNode.style.display = 'none';
        mainContainerRefNode.classList.remove('active');
        mainContainerRefNode.classList.add('after')
        onlineListRefNode.classList.remove('active')
        onlineListRefNode.classList.add('after')
    }



    return (
        <div id="onlinelist-main-container" ref={mainContainerRef}>
            <div id="tab-arrow-container">
                <img src={(rightLogo)} alt="" id="rightLogo" ref={rightArrowRef} onClick={closeTab}/>
                <img src={(leftLogo)} alt="" id="leftLogo" ref={leftArrowRef} onClick={openTab} />
            </div>
            <div id="onlineNamelist">
                <div id="namelist-title">
                    <h4>See who's online</h4>
                </div>
                {
                    signinmessages.map(name => (
                        <p id="onlinenames">{name.username} is online <span id="online-dot"></span></p>
                    ))
                }

            </div>

        </div>
    )
}
export default OnlineList;