import AsyncStorage from '@react-native-community/async-storage'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export const fetchProjects = async () => {
  const keys = await AsyncStorage.getAllKeys()
  const projects = await AsyncStorage.multiGet(keys)

  return projects.map(([ key, value]) => JSON.parse(value))
}

export const saveProject = async ({ id: foundId, image }) => {
  // set uuid to make multiple edits/projects of the same pic
  const id = foundId ? foundId : uuidv4()
  const keys = await AsyncStorage.getAllKeys()

  // await AsyncStorage.multiRemove(keys) to clear all keys in storage

  // check to see if this pic has been saved before
  if (!keys.includes(id)) {
    const project = {
      id,
      image
    }

    await AsyncStorage.setItem(id, JSON.stringify(project))
  }
  console.log('KEYS', keys)
}
