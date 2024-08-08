import React from 'react'
import LoadingImage from "../../assets/images/loading.png"
import LoadingIcon from "../../assets/images//icon _cog-loading.svg"
import "./PrimaryLoading.css"

const PrimaryLoading = () => {
  return (
    <div className="relative">
      <span>loading ...</span>
      <div className='fixed inset-0 w-screen h-screen z-50 flex items-center justify-center'>
        <img className='absolute top-1/3 -ml-3 w-20 h-20 animate-spin' src={LoadingIcon} alt="" />
        <img src={LoadingImage} alt="" />
      </div>
      <div className="opacity-50 fixed inset-0 z-30 bg-black"></div>
    </div>
  )
}

export default PrimaryLoading