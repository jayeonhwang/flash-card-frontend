import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BundleNew } from "./BundleNew";


export function UpdatePage() {

  const [bundles, setBundles] = useState([]);

  const getBundles = () => {
    axios.get("http://localhost:3000/mybundles.json").then(response => {
      console.log(response.data)
      setBundles(response.data)
    })
  }

  const handleCreateBundle = (params, successCallback) => {
    console.log("handleCreateBundle", params)
    axios.post("http://localhost:3000/bundles.json", params).then(response => {
      setBundles([...bundles, response.data])
      successCallback()
    })
  }

  useEffect(getBundles, []);

  return (
    <div>
      <h2>My Bundles</h2>
      <ul>
        {bundles.map(bundle => (
          <li key={bundle.id}>
            <Link to={`/mybundles/${bundle.id}`}>{bundle.title}</Link>
          </li>
        ))
        }
      </ul>
      <BundleNew onCreateBundle={handleCreateBundle} />
    </div >
  )
}