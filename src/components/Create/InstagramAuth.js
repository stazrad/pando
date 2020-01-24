import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import InstagramLogin from 'react-native-instagram-login'

const APP_ID = '876030626185322'
const APP_SECRET = '4cdb1fb02ba36f51322db7e6bcd068f7'

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
