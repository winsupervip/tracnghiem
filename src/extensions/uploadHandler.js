export default function uploadHandler(blobInfo, success, failure, progress) {
  const config = {
    onUploadProgress(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      progress(percentCompleted)
    },
  }

  const formData = new FormData()
  formData.append('formFile', blobInfo.blob(), blobInfo.filename())

  global.$http
    .post('/api/files/upload', formData, config)
    .then((response) => success(response.data.object.url))
    .catch((err) => failure('HTTP Error: ' + JSON.stringify(err)))

  // let xhr, formData

  // // eslint-disable-next-line prefer-const
  // xhr = new XMLHttpRequest()
  // xhr.withCredentials = false
  // console.log(global.$http.defaults.baseURL)
  // xhr.open('POST', '/api/files/upload')

  // xhr.upload.onprogress = function (e) {
  //   progress((e.loaded / e.total) * 100)
  // }

  // xhr.onload = function () {
  //   let json

  //   if (xhr.status === 403) {
  //     failure('HTTP Error: ' + xhr.status, { remove: true })
  //     return
  //   }

  //   if (xhr.status < 200 || xhr.status >= 300) {
  //     failure('HTTP Error: ' + xhr.status)
  //     return
  //   }

  //   // eslint-disable-next-line prefer-const
  //   json = JSON.parse(xhr.responseText)
  //   if (!json || typeof json.object.url !== 'string') {
  //     failure('Invalid JSON: ' + xhr.responseText)
  //     return
  //   }

  //   success(json.object.url)
  // }

  // xhr.onerror = function () {
  //   failure(
  //     'Image upload failed due to a XHR Transport error. Code: ' + xhr.status
  //   )
  // }

  // // eslint-disable-next-line prefer-const

  // xhr.send(formData)
}
