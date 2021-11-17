import axios from 'axios'
import React, { useState } from 'react'
// import { useHistory } from 'react-router'
//import { getAxiosRequestConfig } from '../helpers/api'
import OtherForms from '../components/AddRecipe/OtherInputs'
import { getToken } from '../helpers/auth'
import { ImageUploadField } from '../components/AddRecipe/ImageUploadFields'

const AddRecipeNew = () => {
  const [data, setData] = useState({
      title: '',
      image: '',
      description: '',
      method: '',
      ingredients: '',
      keywords: '',
      time: '',
      servings: '',
      tips: '',
      difficulty: '',
      author: ''
  })

  const [isError, setIsError] = useState(false)

  // const handleError = (error) => {
  //   if (error.response) {
  //     setErrorInfo(error.response.data)
  //     setIsError(true)
  //   }
  // }

  const handleSubmit = async (event) => {
    console.log('button pressed')
    event.preventDefault()
    console.log('submitted data', data)

    const config = {
      method: 'post',
      url: '/api/recipes',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data
    }
    console.log(data)

    try {
      const response = await axios(config)
      console.log(response.data)
      setIsError(false)
      window.alert(`Submitting form data: ${JSON.stringify(data, null, 2)}`)
      // history.push(`/recipes/${response.data._id}`)
    } catch (err) { 
        setIsError(true)
        window.alert(`Submitting form data: ${JSON.stringify(data, null, 2)}`)
    }
  }

  const handleFormChange = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
    console.log(data)
  }

  // const handleChange = event => {
  //   console.log('event.target.checked', event.target.checked)
  //   const value = event.target.type === 'radio' ? event.target.checked : event.target.value
  //   setData({ ...data, [event.target.name]: value })
  // }

  const handleImageUrl = url => {
    setData({ ...data, image: url })
  }

  //const formInputProps = { data, handleFormChange }


    return (
        <section>
            <h1>Add your own recipe</h1>
            <form onSubmit={handleSubmit}>
              <div className='top-div'>
                <OtherForms handleFormChange={handleFormChange}/>
                <ImageUploadField value={data.image} name='image' handleImageUrl={handleImageUrl}/>
              </div>
              <div className='bottom-div'>
                <div className="bottom-form">
                  {isError ? (
                  <div className='error'>
                  <p>Error. Please try again.</p>
                  </div>
                  ) : (
                  <></>
                  )}
                </div>
              </div>
              <div>
                <input type='submit' value='Add Recipe' />
              </div>
          </form>
        </section>
    )
}
export default AddRecipeNew

