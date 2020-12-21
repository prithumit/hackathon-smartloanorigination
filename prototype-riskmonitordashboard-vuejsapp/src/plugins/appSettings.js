import getJSONFromFile from '@/util/fileUtility'

const Settings = require('@/../_config/_app/appConfiguration.json')

const appSettings = getJSONFromFile(Settings)

export default appSettings
