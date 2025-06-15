import { useState } from 'react'
import { convert } from 'html-to-text'

const ReadMoreParagraph = ({ htmlString, maxLength = 200, ...props }): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false)

  const plainText = convert(htmlString, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } }
    ]
  })

  const isLongText = plainText.length > maxLength

  const displayedHtml = isExpanded || !isLongText
    ? htmlString
    : convert(plainText.slice(0, maxLength) + '...', {
      wordwrap: false,
      // convert back to HTML safely
      formatters: { },
      selectors: []
    })

  return (
    <div
      {...props}
      className="read-more-paragraph"
    >
      <p dangerouslySetInnerHTML={{ __html: displayedHtml }} />
      {isLongText && (
        <button
          className="text-blue-500 underline mt-2"
          onClick={() => { setIsExpanded(!isExpanded) }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  )
}

export default ReadMoreParagraph
