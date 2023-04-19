import ArticleBody from '../ArticleBody/ArticleBody'
import CommentsSection from '../CommentsSection/CommentsSection'
import { useState } from 'react'
import './ArticleContainer.css'


const ArticleContainer = () => {

	const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  return (
    <section className='articleContainer'>
        <ArticleBody loading={loading} setLoading={setLoading} error={error} setError={setError}/>
        <CommentsSection loading={loading}  error={error}/>
    </section>
  )
}

export default ArticleContainer