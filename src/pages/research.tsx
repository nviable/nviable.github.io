import React from "react"
import { papers } from "../resources/papers"
import PageLayout from "../components/PageLayout"

const Research = () => {
    const p = papers.map( (paper, index) => {
        const { name, url, year, authors } = paper
        return <div className="paper" key={"paper-"+index}>
          <span className="year">{year}</span>
          <span><a href="{url}" target="_blank">{name}</a></span>
          <span className="authors">
            <ul>
              {authors.map((author, i) => <li key={"paper-"+index+"-"+i}>{author}</li>)}
            </ul>
          </span>
        </div>
      })

    return <PageLayout>
        {p}
    </PageLayout>
}

export default Research