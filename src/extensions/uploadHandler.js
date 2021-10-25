export default function uploadHandler(blobInfo, success, failure, progress) {
  let xhr, formData

  // eslint-disable-next-line prefer-const
  xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  xhr.open('POST', '/api/files/upload')

  xhr.upload.onprogress = function (e) {
    progress((e.loaded / e.total) * 100)
  }

  xhr.onload = function () {
    let json

    if (xhr.status === 403) {
      failure('HTTP Error: ' + xhr.status, { remove: true })
      return
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failure('HTTP Error: ' + xhr.status)
      return
    }

    // eslint-disable-next-line prefer-const
    json = JSON.parse(xhr.responseText)
    if (!json || typeof json.object.url !== 'string') {
      failure('Invalid JSON: ' + xhr.responseText)
      return
    }

    success(json.object.url)
  }

  xhr.onerror = function () {
    failure(
      'Image upload failed due to a XHR Transport error. Code: ' + xhr.status
    )
  }

  // eslint-disable-next-line prefer-const
  formData = new FormData()
  formData.append('formFile', blobInfo.blob(), blobInfo.filename())

  xhr.send(formData)
}
