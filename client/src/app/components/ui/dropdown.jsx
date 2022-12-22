import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import DropdownField from '../common/form/dropdownField'

import '../../../css/dataForm.css'

const Dropdown = ({adults, childrens, handleInc, handleDec, max}) => {
  const [isOpen, setOpen] = useState(false)

  const dropwodnRef = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropwodnRef.current && !dropwodnRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropwodnRef])

  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  const disabledIncrement = max && max <= adults + childrens

  return (
    <>
      <div className="dropdown" ref={dropwodnRef}>
        <button
          onClick={toggleMenu}
          className="count-adult-input"
          type="button"
        >
          {`${adults} Взрослых - ${childrens} Детей`}
        </button>

        <ul className={'menu-counter dropdown-menu ' + (isOpen ? ' show' : '')}>
          <li>
            <span className="optionText">Взрослые</span>
            <DropdownField
              onChange={handleDec}
              className="optionCounterButton"
              value={adults}
              disabled={adults <= 1}
              name="adults"
              type="button"
              text="-"
            />

            <span className="optionCounterNumber">{adults}</span>

            <DropdownField
              onChange={handleInc}
              className="optionCounterButton"
              value={adults}
              name="adults"
              type="button"
              text="+"
              disabled={disabledIncrement}
            />
          </li>
          <li>
            <span className="optionText">Дети</span>
            <DropdownField
              onChange={handleDec}
              className="optionCounterButton"
              value={childrens}
              disabled={childrens <= 0}
              name="children"
              type="button"
              text="-"
            />

            <span className="optionCounterNumber">{childrens}</span>

            <DropdownField
              onChange={handleInc}
              className="optionCounterButton"
              value={childrens}
              name="children"
              type="button"
              text="+"
              disabled={disabledIncrement}
            />
          </li>
        </ul>
      </div>
    </>
  )
}

Dropdown.propTypes = {
  adults: PropTypes.number.isRequired,
  childrens: PropTypes.number.isRequired,
  handleInc: PropTypes.func,
  handleDec: PropTypes.func,
  max: PropTypes.number
}

export default Dropdown
