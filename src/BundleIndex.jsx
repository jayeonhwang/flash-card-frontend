import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function BundleIndex() {
  const [bundles, setBundles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  const getBundles = () => {
    axios.get("/bundles.json").then(response => {
      console.log(response.data)
      setBundles(response.data)
    })
  }



  useEffect(getBundles, []);

  return (
    <div className="bundle-index">
      <div className="search-bar">
        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search or user name" />
      </div>
      <div className="bundle-container">
        {bundles
          .filter(bundle => bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) || bundle.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(filteredBundle => (
            <div key={filteredBundle.id} className="bundle-link">
              <Link className="bundle-name" to={`/bundles/${filteredBundle.id}`}>{filteredBundle.title}</Link>
              <p>{filteredBundle.user_name}</p>
            </div>
          ))}
      </div>
    </div>

  )
}