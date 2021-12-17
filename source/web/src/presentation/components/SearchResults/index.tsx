import { useContext, useState } from 'react'
import { SearchContext } from '../../../logic/contexts/SearchContext'
import { UserTimelineContext } from '../../../logic/contexts/UserTimelineContext'

import { VerifiedAccountIcon } from '../VerifiedAccountIcon'

import {
  Container,
  MessageArea,
  ResultBox,
  ImageSection,
  ImageContainer,
  Image,
  InfoSection,
  DiscriminationInfo,
  AdditionalInfo
} from './styles'

export function SearchResults() {
  const { results } = useContext(SearchContext)
  const { getUser } = useContext(UserTimelineContext)
  const [visible, setVisible] = useState<boolean>(true)

  const onResultClick = (userId: string) => {
    getUser(userId)
    setVisible(false)
  }

  let resultBoxes: JSX.Element[] =
    results.length > 0
      ? results.map(
        result => {
          return (
            <ResultBox 
              key={result.Id}
              onClick={() => onResultClick(result.Id)}
            >
              <ImageSection>
                <ImageContainer>
                  <Image src={
                    result.ProfileImageUrl != null
                     ? result.ProfileImageUrl
                     : 'defaultProfileImage.png'
                  } />
                </ImageContainer>
              </ImageSection>
              <InfoSection>
                <DiscriminationInfo>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      maxWidth: '100%'
                    }}
                  >
                    <div 
                      style={{
                        fontWeight: 700,
                        fontSize: '15px',
                        whiteSpace: 'nowrap',
                        lineHeight: '20px',
                        overflowWrap: 'break-word',
                        color: 'rgba(217,217,217,1.00)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span 
                        style={{
                          whiteSpace: 'nowrap',
                          overflowWrap: 'break-word',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {result.Name}
                      </span>
                    </div>
                    <div  
                      style={{
                        display: result.VerifiedAccount
                        ? 'inlne-flex' : 'none',
                        fontSize: '15px',
                        overflowWrap: 'break-word',
                        lineHeight: '20px',
                        whiteSpace: 'pre-wrap',
                        
                      }}
                    >
                      <VerifiedAccountIcon />
                    </div>
                  </div>

                  <div 
                    style={{
                      flexShrink: 1,
                      fontSize: '14.5px',
                      lineHeight: '20px',
                      overflowWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',

                    }}
                  >
                    <span 
                      style={{
                        overflowWrap: 'break-word',
                        textOverflow: 'ellipsis',
                        color: 'rgb(110, 118, 125)'
                      }}
                    >
                      @{result.Username}
                    </span>
                  </div>
                </DiscriminationInfo>
                <AdditionalInfo>
                  <span>{result.Bio}</span>
                </AdditionalInfo>
              </InfoSection>
            </ResultBox>
          )
        }
      )
      : []

  return (
    <Container style={{display: visible ? 'block' : 'none'}}>
      <MessageArea style={{display: resultBoxes.length == 0 ? 'block' : 'none'}}>
        <span>Try searching for people</span>
      </MessageArea>
      { resultBoxes }
    </Container>
  )
}