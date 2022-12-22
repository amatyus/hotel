import React from 'react'
import FilterRooms from '../components/ui/filterRooms'
import HomeCard from '../components/ui/homeCard'
import TitleInfo from '../components/titleInfo'
import Footer from '../components/footer'

import '../../css/base.css'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
const Main = () => {
  return (
    <>
      <div className="row justify-content-evenly my-5">
        <div className="col-5 d-flex align-items-center">
          <div className="card-search">
            <HomeCard
              title={' Природа, тепло и красота в одном пространстве'}
              text={
                'Одно место, чтобы снять весь стресс, вернуть счастье и вернуться к природе. Мы предоставляем лучший номер и природу для вас. Приходите к нам в любое время, когда вы хотите.'
              }
            />
            <FilterRooms />
          </div>
        </div>
        <div className="col-5">
          <img
            className="p-0 m-0"
            src={require('../../img/home.jpg')}
            alt="home"
          />
        </div>
      </div>
      <div className="container text-center pt-4">
        <div className="row align-items-center">
          <div className="col d-flex justify-content-center">
            <HomeCard subtitle={'Выбор номера на любой вкус'} />
          </div>
        </div>
      </div>
      <TitleInfo />
      <Footer />
    </>
  )
}

export default Main
