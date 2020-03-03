import React from "react"

import styles from "../css/articlepreview.module.css"

class ArticlePreview extends React.Component {
  render() {
    const data = this.props

    return (
      <div className={styles.article}>
        <div className={styles.info}>
          <span>{data.date}</span>
          <span>{data.author}</span>
          <span>{data.publication}</span>
        </div>
        <span className={styles.category}>{data.category}</span>
        <a target="_blank" className={data.subtitle == "" ? styles.titlenosubtitle : styles.title} href={data.link}>
          {data.title}
        </a>
        <div className={styles.subtitle}>{data.subtitle}</div>
      </div>
    )
  }
}

export default ArticlePreview

/*
            date(formatString: "MMMM DD, YYYY")
            title
            subtitle
            link
            author
            publication
            category
            subcategory
            readingtime
          */
