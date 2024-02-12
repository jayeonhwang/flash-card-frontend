import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function BundleIndex() {
  const [bundles, setBundles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  const getBundles = () => {
    axios.get("http://localhost:3000/bundles.json").then(response => {
      console.log(response.data)
      setBundles(response.data)
    })
  }

  useEffect(getBundles, []);

  return (
    <div>
      <h3>Search: <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></h3>
      {bundles
        .filter(bundle => bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) || bundle.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(filteredBundle => (
          <div key={filteredBundle.id}>
            <Link to={`/bundles/${filteredBundle.id}`}>{filteredBundle.title}</Link>
            <p>{filteredBundle.user_name}</p>
            <hr />
          </div>
        ))}
    </div>

  )
}