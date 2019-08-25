import React, {Component} from 'react'
import styled from 'styled-components'
import ChatBox from 'components/chat-box.jsx'
import  VideoPage from 'components/video-page.jsx'

const ScreenContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    min-width: calc(100vw);
    width: calc(100vw)
    max-width: calc(100vw);
    height: calc(100vh);
    max-height: calc(100vh);
    justify-content: center;
`
const ChatRoom = styled.div`
    display: flex;
    // position: absolute;
    width: 600px;
    height: calc(100%);
    z-index: ${props=>props.isShown ? 1 : 0};
    flex-grow: 5;
`
const VideoRoom = styled.div`
    display: flex;
    position: relative;
    // min-width: 100px;
    left: 0px;
    transition: left .3s;
    top: 0;
    width: calc(100%);
    max-width: 550px;
    height: calc(100%);
    flex-grow: 4;
    z-index: 0;
    @media (max-width: 550px) {
        position: absolute;
    }
`


class Screen extends Component {
    constructor(props) {
        super(props)
        this.state={
            ChatRoomIsShown: false
        }
        this.videoHideHandler = this.videoHideHandler.bind(this)
    }
    videoHideHandler(state) {
        this.setState({
            ChatRoomIsShown: state
        })
    }
    render() {
        return (
            <ScreenContainer>
                <ChatRoom isShown={this.state.ChatRoomIsShown}>
                    <BackBtn
                        forVideo={false}
                        videoHideHandler={this.videoHideHandler}/>
                    <ChatBox />
                </ChatRoom>
                <VideoRoom>
                    <BackBtn
                        forVideo={true}
                        videoHideHandler={this.videoHideHandler}/>
                    <VideoPage
                        // playList={[]}
                        // searchList={[]}
                        // live={true}
                        // searchState={false}
                        // dispatch={''}
                        // msg={''}
                        // userId={''}
                        // videoHost={true}
                        // videoNowTime={''}
                        // videoMsg={''}
                        // videoMsgLoading={false}
                    />
                </VideoRoom>
            </ScreenContainer>
        )
    }
    
}

export default Screen

const BackBtnWrapper = styled.div`
    display: none;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    z-index: 1;
    @media (max-width: 550px) {
        display: flex;
    }
`
const Icon = styled.img`
    width: 100%;
    height: 100%;
`
const BackBtn = (props) => {
    const isOff = props.forVideo
    return (
        <BackBtnWrapper 
            href="#app" 
            className="back-link"
            onClick={()=>props.videoHideHandler(isOff)}
            >
            <Icon src="icons/back.png" />
        </BackBtnWrapper> 
    )
}