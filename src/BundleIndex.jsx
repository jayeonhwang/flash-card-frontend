import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


export function BundleIndex() {

  const [bundles, setBundles] = useState([]);

  const getBundles = () => {
    axios.get("http://localhost:3000/bundles.json").then(response => {
      console.log(response.data)
      setBundles(response.data)
    })
  }

  useEffect(getBundles, []);

  return (
    <div>
      <h1>Bundles</h1>
      {bundles.map(bundle => (
        <div key={bundle.id}>
          <p>{bundle.title}</p>
          <Link to={`/bundles/${bundle.id}`}>{bundle.title}</Link>
        </div>
      ))
      }
    </div >
  )
}