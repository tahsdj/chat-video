import React, {Component} from 'react'
import styled from 'styled-components'

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
    min-width: 400px;
    height: calc(100%);
    flex-grow: 3;
    // background-color: red;
`
const VideoRoom = styled.div`
    display: flex;
    min-width: 300px;
    height: calc(100%);
    flex-grow: 1;
    // background-color: green;
`


class Screen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScreenContainer>
                <ChatRoom>
                    chat
                </ChatRoom>
                <VideoRoom>
                    video
                </VideoRoom>
            </ScreenContainer>
        )
    }
    
}

export default Screen