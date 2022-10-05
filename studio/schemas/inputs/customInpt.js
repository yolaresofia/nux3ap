import React from 'react'
import PropTypes from 'prop-types'

import {withDocument} from 'part:@sanity/form-builder'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import { Tooltip, Text, Box, TextInput } from "@sanity/ui";


// 2. Transform hours and minutes to a formatted time string
const outgoingValue = (hours, minutes) => `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}`

// 3. Transform a formatted time string to hours and minutes
const incomingValues = value => {
  if (!value) {
    return {}
  }
  const [hours, minutes] = value.split(':')
  return {
    hours: Number(hours),
    minutes: Number(minutes)
  }
}

// 4. Create a Sanity PatchEvent based on a change in time value
const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))

class MyInput extends React.Component {

  // 5. Declare shape of React properties
  

  timeInput = this.timeInput

  // 6. Called by the Sanity form-builder when this input should receive focus
//   focus = () => {
//     this.timeInput.current.focus()
//   }

  // 7. Function called whenever an editor changes a value
  handleTimeChange = (x) => {
    // const {onChange} = this.props
    // if (Number.isInteger(hours) && Number.isInteger(minutes)) {
    //   const timeAsString = outgoingValue(hours, minutes)
    //   onChange(createPatchFrom(timeAsString))
    // }
    console.log(x);
  }

  render = () => {
    // const {type, value} = this.props
    // const {hours, minutes} = incomingValues(value)
    return (

      // 8. Use FormField if you want title and description rendered like any other input field
      <FormField >

        {/* Render Timepicker with hours, minutes and onChange callback function */}
        {/* <Timepicker
          hours={hours}
          minutes={minutes}
          onChange={this.handleTimeChange}
          ref={this.timeInput}
        /> */}
        <TextInput
          type="text"
          
          
          value={props.value}
          onChange={this.handleTimeChange}
        />
      </FormField>
    )
  }
}

export default withDocument(MyInput)