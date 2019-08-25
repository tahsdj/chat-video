import React, {Component} from 'react'
import styled from 'styled-components'


const VideoButtonConatiner = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;
    width: calc(100% - 20px);
    padding: 10px;
    filter: brightness(75%);
    // margin: 10px 0px 5px 0px;
    background-color: ${ props => props.isPlaying ? 'rgba(255,255,255,.16)': ''}
`

const Thumbnail = styled.img`
    width: 50px;
    height: auto;
`
const Info = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding: 0px 10px;
    align-items: flex-start;
`
const Text = styled.span`
    color: rgba(220,220,220,1);
    font-size: ${ props => props.title ? '0.9em' : '0.8em'};
`

const VideoButton = (props) => (
    <VideoButtonConatiner
        isPlaying={props.isPlaying}
    >
        <Thumbnail src={props.image}/>
        <Info>
            <Text title>{props.title}</Text>
            <Text channel>{`by ${props.channelName}`}</Text>
        </Info>
    </VideoButtonConatiner>
)


export default VideoButton