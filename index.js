import fs from 'fs'

function appException(message = '') {
  this.message = message
  this.name = 'AppException'
}

function app() {
  console.log('Initializing...');
  let config = {
    name: 'comptest',
    folderName: 'test',
    dist: './dist/test/lala/ferrari/camaro/carrao/'
  }

  readJson(false, (compJson) => {
    console.log(compJson)
    checkOrCreateFolder({
      folder: config.dist,
    })
  })

}

const createFolderSync = (path) => (!fs.existsSync(path) && fs.mkdirSync(path))
const checkAndCreate = (paths = '') => {
  paths.split('/').reduce(
    (lastName, name) => {
      createFolderSync(lastName.join('') + name)
      lastName.push(name + '/')
      return lastName
  }, [])
}

function checkOrCreateFolder({ folder = 'dist' }, cb = function() {}) {
  fs.access(folder, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(err) {
      checkAndCreate(folder)

      if(typeof cb !== 'function')
        throw new appException('readJson callback is an invalid function')

      return cb()
    }
  })
}

const readJson = ({ name = './.componizer' }, cb = function() {}) => {
  fs.readFile(name, 'utf8', (err, data) => {
    if (err) throw err

    const parsedData = JSON.parse(data)

    if(typeof parsedData !== 'object')
      throw new appException('JSON.parse error')

    if(typeof cb !== 'function')
      throw new appException('readJson callback is an invalid function')

    return cb(parsedData)
  })
}

module.exports = app()
