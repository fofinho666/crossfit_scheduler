import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import JobModal from "../molecules/jobModal"

const NewJobButton = () => {

  const [activeModal, setActiveModal] = useState(false)
  const openModal = () => { setActiveModal(true) }
  const closeModal = () => { setActiveModal(false) }

  return <>
    <button className="button is-primary" onClick={openModal}>
      <span className="icon is-small">
        <FontAwesomeIcon icon={faPlus} />
      </span>
    </button>
    <JobModal title="New Job" activeModal={activeModal} closeModal={closeModal} />
  </>

}

export default NewJobButton