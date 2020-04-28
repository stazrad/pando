import AsyncStorage from '@react-native-community/async-storage'
import RNFS from 'react-native-fs'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export const createProject = async ({ image }) => {
  // set uuid to make multiple edits/projects of the same pic
  const id = uuidv4()
  const project = {
    cropState: {},
    dateLastEdit: new Date(),
    draft: true,
    id,
    image
  }

  // const keys = await AsyncStorage.getAllKeys()
  //
  // await AsyncStorage.multiRemove(keys) // to clear all keys in storage

  // store under new id
  await AsyncStorage.setItem(id, JSON.stringify(project))

  return project
}

export const deleteProject = async project => {
  try {
    // TODO this substring seems fragile
    const path = RNFS.DocumentDirectoryPath + project.image.path.substring(11)
    await RNFS.unlink(path)
    return await AsyncStorage.removeItem(project.id)
  } catch (err) {
    console.log('DELETE ERR', err)
  }
}

export const fetchProjects = async () => {
  const keys = await AsyncStorage.getAllKeys()
  const fetchProjects = await AsyncStorage.multiGet(keys)
  const projects = fetchProjects
    .map(([ key, value]) => JSON.parse(value))
    .sort((a, b) => new Date(b.dateLastEdit) - new Date(a.dateLastEdit))

  projects.forEach(proj => console.log(proj))

  return projects
}

export const updateProject = async proj => {
  const project = {
    ...proj,
    dateLastEdit: new Date(),
  }

  delete project.draft // remove draft key added by createProject
  
  // project will overwrite existing id
  await AsyncStorage.setItem(project.id, JSON.stringify(project))

  return project
}
