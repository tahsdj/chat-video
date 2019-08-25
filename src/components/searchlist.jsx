import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {handleInputContent, getMessageData} from 'states/actions/message.js'
import VideoBoard from 'components/video-board.jsx'
import {getVideoData} from 'states/actions/video.js'
import {userId} from 'api/constant.js'
import {_onMessage} from 'api/data.js'
import SearchBox from 'components/search-box.jsx'
import {changeSearchState} from 'states/actions/video-search.js'



const SearchListContainer = styled.div`
    display: block;
    flex-direction: column;
    max-height: calc(100vh - 150px);
    width: calc(100% - 10px);
    padding: 10px 10px;
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
`


const SearchList = () => (
    <SearchListContainer>
    
    </SearchListContainer>
)

const VideoResult = () => (
    <VideoResultContainer>
        <Infomation>
            <Picture />
            <Content>
                <Title></Title>
                <Artist></Artist>
            </Content>
        </Infomation>
    </VideoResultContainer>
)

const Button = () => (
    <ButtonContainer>
        <Text></Text>
    </ButtonContainer>
)