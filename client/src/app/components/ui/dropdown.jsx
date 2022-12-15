import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import '../../../css/dataForm.css'
import DropdownField from '../common/form/dropdownField'

const Dropdown = ({adult, childrens, handleInc, handleDec}) => {
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

  return (
    <>
      <div className="dropdown" ref={dropwodnRef}>
        <button
          onClick={toggleMenu}
          className="count-adult-input"
          type="button"
        >
          {`${adult} Взрослых - ${childrens} Детей`}
        </button>

        <ul className={'menu-counter dropdown-menu ' + (isOpen ? ' show' : '')}>
          <li>
            <span className="optionText">Взрослые</span>
            <DropdownField
              onChange={handleDec}
              className="optionCounterButton"
              value={adult}
              amount={adult <= 1}
              name="adult"
              type="button"
              text="-"
            />

            <span className="optionCounterNumber">{adult}</span>
            <DropdownField
              onChange={handleInc}
              className="optionCounterButton"
              value={adult}
              name="adult"
              type="button"
              text="+"
            />
          </li>
          <li>
            <span className="optionText">Дети</span>
            <DropdownField
              onChange={handleDec}
              className="optionCounterButton"
              value={childrens}
              amount={childrens <= 0}
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
            />
          </li>
        </ul>
      </div>
    </>
  )
}

Dropdown.propTypes = {
  adult: PropTypes.number.isRequired,
  childrens: PropTypes.number.isRequired,
  handleInc: PropTypes.func,
  handleDec: PropTypes.func
}

export default Dropdown
