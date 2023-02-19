import React from 'react'
import { useParams } from 'react-router-dom'
import CreateArticle from './CreateArticle'

const EditArticle = () => {
    const {id} = useParams()
  return (
    <CreateArticle article_id={id} />
  )
}

export default EditArticle