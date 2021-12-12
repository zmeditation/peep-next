import { useEffect, useState } from 'react'
import useTranslation from '../../hooks/useTranslation'

import { 
  ProfileContainer, 
  Banner,
  Avatar, 
  ProfileImage,
  ProfileData, 
  LocationIcon, 
  CakeIcon, 
  Followage,
  EditButton, 
  ProfileTweetsContainer,
  TabsContainer,
  Tab
} from './styles'

import { Feed } from '../Feed'
import { User } from '../../../logic/contracts/Entity'

type ProfileProps = {
  user: User
}

export function Profile(props: ProfileProps) {
  const { t } = useTranslation()
  const [user, setUser] = useState<User>(props.user)

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  return (
    <ProfileContainer>
      <Banner>
        <Avatar>
          <ProfileImage src={
            typeof user.ProfileImageUrl != 'undefined' 
              ? user.ProfileImageUrl
              : 'defaultProfileImage.png'
            }/>
        </Avatar> 
      </Banner>

      <ProfileData>
        <EditButton outlined>Editar perfil</EditButton>

        <h1>{user.Name}</h1>
        <h2>@{user.Username}</h2>

        {/* <p>Cantor e compositor Ednaldo Pereira</p>
        <br />
        <p>Contribua  <a href="http://apoia.se/ednaldopereira" style={{
          color: 'var(--peep)'
        }}>http://apoia.se/ednaldopereira</a>  para receber  seu vídeo</p> */}

        <p>{user.Bio}</p>

        <ul>
          <li>
            <LocationIcon />
            {user.Location}
          </li>
          <li>
            <CakeIcon />
            {t("User.Info.BirthDate")} {user.BirthDate}
          </li>
        </ul>

        <Followage>
          <span><strong>0</strong> {t("User.Connections.Following")}</span>
          <span><strong>0</strong> {t("resource.User.Connections.Followers")}</span>
        </Followage>
      </ProfileData>

      <ProfileTweetsContainer>
        <TabsContainer>
          <Tab className="active">Tweets</Tab>
          <Tab>Tweets e respostas</Tab>
          <Tab>Mídia</Tab>
          <Tab>Curtidas</Tab>
        </TabsContainer>

        <Feed />
      </ProfileTweetsContainer>

    </ProfileContainer>
  )
}