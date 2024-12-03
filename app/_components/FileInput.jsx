'use client'

import axios from 'axios'
import { useState } from 'react'
import Image from 'next/image'
import { Camera, Pencil, Trash } from 'lucide-react'

export const FileInput = ({ name, watch, setValue }) => {
  const image = watch(name)
  const [loading, setLoading] = useState(false)

  const handleUpload = async e => {
    const files = e.target.files

    if (files.length === 0) return

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)

    try {
      // Convert file to base64 to send to the server
      const base64 = await convertToBase64(file)

      // Send the image to the API route
      const response = await axios.post('/api/file', { base64 })

      console.log(response)

      // Extract the image URL from response data and set it in form state
      setValue(name, response.data.url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to convert file to base64
  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  return (
    <>
      {!loading ? (
        <div>
          {image ? (
            image.split('.')[1] === 'pdf' ? (
              <div className='w-[200px] h-[150px] flex justify-center items-center font-semibold rounded-md hover:bg-gray-400 bg-gray-300'>
                Uploaded successfully
              </div>
            ) : (
              <>
                <div className='inset-0 flex  sm:hidden justify-end my-2 items-center z-10'>
                  <label
                    htmlFor={`image-${name}`}
                    className='w-9  h-9 relative bg-white top-10   z-[99] rounded-full flex justify-center items-center'
                  >
                    <Pencil className='text-red-500 text-sm' />
                  </label>
                </div>
                <div className='w-[100px] h-[100px] rounded-md relative group hover:opacity-80 overflow-hidden'>
                  <img
                    className='h-full w-full rounded-full object-center object-cover'
                    src={image}
                    alt='Uploaded image'
                  />
                  <div className='absolute inset-0 hidden sm:group-hover:flex justify-center items-center gap-5 z-10'>
                    <label htmlFor={`image-${name}`}>
                      <Pencil className='text-red-500 text-2xl' />
                    </label>
                  </div>
                </div>
              </>
            )
          ) : (
            <div>
              <label
                htmlFor={`image-${name}`}
                className=' text-sm w-[100px] h-[100px] rounded-full cursor-pointer hover:bg-gray-400  relative flex flex-col bg-gray-300 items-center justify-center gap-4'
              >
                <Camera />
              </label>
            </div>
          )}

          <input
            hidden
            type='file'
            id={`image-${name}`}
            onChange={handleUpload}
          />
        </div>
      ) : (
        <div className='w-[100px] h-[100px] rounded-full text-xs flex flex-col justify-center items-center font-semibold  bg-[#edeef0]'>
          <p className='font-semibold text-xs'>Uploading...</p>
        </div>
      )}
    </>
  )
}