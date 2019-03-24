import React, {Component} from 'react'
import styled from 'styled-components'
import ChatBox from 'components/chat-box.jsx'
import  VideoPage from 'components/video-page.jsx'

const ScreenContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: calc(100vw);
    height: calc(100vh);
    justify-content: space-around;
`
const ChatRoom = styled.div`
    display: flex;
    width: 400px;
    height: calc(100%);
    flex-grow: 5;
`
const VideoRoom = styled.div`
    display: flex;
    width: 300px;
    height: calc(100%);
    flex-grow: 4;
`


class Screen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScreenContainer>
                <ChatRoom>
                    <ChatBox />
                </ChatRoom>
                <VideoRoom>
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