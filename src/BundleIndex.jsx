import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BundleNew } from "./BundleNew";


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
      <h1>All Bundles</h1>
      {bundles.map(bundle => (
        <div key={bundle.id}>
          <Link to={`/bundles/${bundle.id}`}>{bundle.title}</Link>
        </div>
      ))
      }
    </div >
  )
}