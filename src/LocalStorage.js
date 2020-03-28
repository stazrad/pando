import AsyncStorage from '@react-native-community/async-storage'

export const fetchProjects = async () => {
  const keys = await AsyncStorage.getAllKeys()
  const projects = await AsyncStorage.multiGet(keys)

  return projects.map(([ key, value]) => JSON.parse(value))
}

export const saveProject = async ({ image }) => {
  const { localIdentifier } = image
  const keys = await AsyncStorage.getAllKeys()
  // TODO this might be better as a set uuid to make
  // multiple edits/projects of the same pic?

  // check to see if this pic has been saved before
  if (!keys.includes(localIdentifier)) {
    const project = {
      image
    }

    await AsyncStorage.setItem(localIdentifier, JSON.stringify(project))
  }
  console.log('KEYS', keys)
}
