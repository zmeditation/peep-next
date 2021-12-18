import StickyBox from 'react-sticky-box'
import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../../logic/contexts/SearchContext'

import { SearchResults } from '../SearchResults'
import { List } from '../List'
import { News } from '../News'
import { FollowSuggestion } from '../FollowSuggestion'
import {
  Container,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  Body
} from './styles'

export function SideBar() {
  const { searchStr, onSearchChange, showResults, hideResults, loading, changeLoading } 
    = useContext(SearchContext)

  useEffect(() => {
    if (searchStr.length > 0) {
      if (!loading) 
        changeLoading(true)
    } else {
      changeLoading(false)
    }
  }, [searchStr])

  

  return (
    <Container>
      <SearchWrapper>
        <SearchInput 
          placeholder="Buscar no Twitter" 
          value={searchStr}
          onChange={e => onSearchChange(e)}
          onFocus={showResults}
          onBlur={hideResults}
        />
        <SearchIcon />
      </SearchWrapper>
      <SearchResults />
      <StickyBox>
        <Body>
          <List 
            title="Acontecendo agora"
            elements={[
              <h1>Teste</h1>,
              <h1>Teste</h1>,
              <h1>Teste</h1>
            ]}
          />
          <List 
            title="Talvez você curta"
            elements={[
              <FollowSuggestion
                name="Rocketseat"
                nickname="@rocketseat"
              />,
              <FollowSuggestion
              name="Gabriel Froes"
              nickname="@GabrielFroes"
              />,
              <FollowSuggestion
              name="balta.io"
              nickname="@balta_io"
              />
            ]}
          />
          <List
            title="Acontecendo agora"
            elements={[
              <News 
                label="Assuntos do momento no Brasil"
                title="CPI da Covid"
              />,
              <News 
                label="Assuntos do momento no Brasil"
                title="Fora Bozo"
              />,
              <News 
                label="Assuntos do momento no Brasil"
                title="#VOLTALULA"
              />
            ]}
          />
        </Body>
      </StickyBox>
    </Container>
  )
}