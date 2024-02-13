import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BundleNew } from "./BundleNew";
import { Modal } from "./Modal";


export function MyPage() {
  const [bundles, setBundles] = useState([]);
  const [isBundleShowVisible, setIsBundleShowVisible] = useState(false)
  const [currentBundle, setCurrentBundle] = useState({})

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

  const handleDestroyBundle = (bundle) => {
    console.log("handleDestroyBundle", bundle);
    axios.delete(`http://localhost:3000/bundles/${bundle.id}.json`).then(response => {
      setBundles(bundles.filter((b) => b.id !== bundle.id))
    })
  }

  const handleShowBundle = (bundle) => {
    setIsBundleShowVisible(true)
    setCurrentBundle(bundle)
  }

  const handleClose = () => {
    setIsBundleShowVisible(false);
  }

  const handleUpdateBundle = (id, params, successCallBack) => {
    console.log("handleUpdateBundle", params);
    axios.patch(`http://localhost:3000/bundles/${id}.json`, params).then(response => {
      setBundles(
        bundles.map(bundle => {
          if (bundle.id === response.data.id) {
            return response.data;
          } else {
            return bundle;
          }
        })
      )
      successCallBack()
      handleClose()
    })
  }

  const handleSubmit = (event, bundle) => {
    event.preventDefault();
    const params = new FormData(event.target)
    handleUpdateBundle(bundle.id, params, () => event.target.reset())
  }

  useEffect(getBundles, []);

  return (
    <div className="my-page">
      <h2>My Bundles</h2>
      <BundleNew onCreateBundle={handleCreateBundle} />
      <ul>
        {bundles.map(bundle => (
          <li key={bundle.id} className="bundle-show">
            <div className="bundle-info">
              <Link to={`/mybundles/${bundle.id}`}>{bundle.title}</Link>
              <Modal show={isBundleShowVisible && currentBundle.id === bundle.id} onClose={handleClose}>
                <form onSubmit={(event) => handleSubmit(event, bundle)}>
                  Change Title: <input defaultValue={bundle.title} name="title" type="text" />
                  <button type="submit">Update Title</button>
                </form>
                <button onClick={() => handleDestroyBundle(bundle)}>Delete</button>
              </Modal>
            </div>

            <button onClick={() => handleShowBundle(bundle)}>Update</button>
          </li>
        ))
        }
      </ul>

    </div >
  )
}