import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import InstagramLogin from 'react-native-instagram-login'
import { APP_ID, APP_SECRET } from 'react-native-dotenv'

function InstagramAuth (props) {
  let instagramLogin // set to ref
  const onSuccess = data => {
    console.log('SUCCESS!', data)
  }

  return (
    <View>
        <TouchableOpacity onPress={()=> instagramLogin.show()}>
            <Text style={{color: 'black'}}>Post to Instagram</Text>
        </TouchableOpacity>
        <InstagramLogin
            ref={ref => (instagramLogin = ref)}
            appId={APP_ID}
            appSecret={APP_SECRET}
            redirectUrl='your-redirect-Url'
            scopes={['user_profile', 'user_media']}
            onLoginSuccess={onSuccess}
            onLoginFailure={(data) => console.log('FAILURE', data)} />
    </View>
  )
}

export default InstagramAuth
