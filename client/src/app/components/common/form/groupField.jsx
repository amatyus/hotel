import React from 'react'
import GroupList from '../../ui/groupList'
import Button from '../button'
import PropTypes from 'prop-types'

const GroupField = ({value, onChange}) => {
  return (
    <>
      <div className="d-inline-flex flex-column ">
        <GroupList onItemSelect={onChange} selectedItem={value} />

        <Button
          text="Очистить"
          type="button"
          onClick={() => onChange()}
          className={'mt-1'}
        />
      </div>
    </>
  )
}

GroupField.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}

export default GroupField
