import createStore from 'structured-react-hook'
import React from 'react'

function getInitState (language) {
  const text = 'Waiting to be processed'
  const paddingState = false
  return {
    stateOne: {
      text,
      paddingState
    },
    stateTwo: {
      text,
      paddingState
    },
    stateThree: {
      text,
      paddingState
    }
  }
}

const storeConfig = {
  initState: [
    {
      stateOne: {},
      stateTwo: {},
      stateThree: {}
    },
    function (initArgs) {
      return getInitState()
    }
  ],
  service: {
    delay (time = 1000) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          resolve(clearTimeout(timer))
        }, time)
      })
    },
    createHandleState (value, delayTime) {
      return async callback => {
        const beginState = {
          text: `Start the process ${value}`,
          paddingState: true
        }
        const overState = {
          text: `Process ${value} over`,
          paddingState: false
        }
        callback(beginState)
        await this.service.delay(delayTime)
        callback(overState)
      }
    },
    handleStateOne () {
      return this.service.createHandleState('1')
    },
    handleStateTwo () {
      return this.service.createHandleState('2')
    },
    handleStateThree () {
      return this.service.createHandleState('3')
    }
  },
  controller: {
    onResetButtonClick () {
      this.rc.setState(getInitState(this.context.language))
    },
    async onDefaultLogicButtonClick () {
      await this.service.handleStateOne()(stateOne => {
        this.rc.setState({
          stateOne
        })
      })
      await this.service.handleStateTwo()(stateTwo => {
        this.rc.setState({
          stateTwo
        })
      })
      await this.service.handleStateThree()(stateThree => {
        this.rc.setState({
          stateThree
        })
      })
    }
  },
  membrane: {
    service: {
      handleStateOne () {
        return this.super.service.createHandleState('1', 1000)
      },
      handleStateTwo () {
        return this.super.service.createHandleState('2', 2000)
      },
      handleStateThree () {
        return this.super.service.createHandleState('3', 3000)
      }
    },
    controller: {
      async onDefaultLogicButtonClick () {
        console.log(this.props)
        if (this.props == 1) {
          this.super.controller.onDefaultLogicButtonClick()
        }
        if (this.props == 2) {
          this.service.handleStateOne()(stateOne => {
            this.rc.setState({
              stateOne
            })
          })
          this.service.handleStateTwo()(stateTwo => {
            this.rc.setState({
              stateTwo
            })
          })
          this.service.handleStateThree()(stateThree => {
            this.rc.setState({
              stateThree
            })
          })
        }
        if (this.props == 3) {
          this.super.service.handleStateOne()(stateOne => {
            this.rc.setState({
              stateOne
            })
          })
          this.super.service.handleStateTwo()(stateTwo => {
            this.rc.setState({
              stateTwo
            })
          })
          this.super.service.handleStateThree()(stateThree => {
            this.rc.setState({
              stateThree
            })
          })
        }
        if (this.props == 4) {
          window.alert('About to start production')
          await this.super.controller.onDefaultLogicButtonClick()
          window.alert('Production over')
        }
        if (this.props == 5) {
          await this.super.service.handleStateOne()(stateOne => {
            this.rc.setState({
              stateOne
            })
          })
          const going = window.confirm('Is production confirmed on demand')
          if (going) {
            await this.super.service.handleStateTwo()(stateTwo => {
              this.rc.setState({
                stateTwo
              })
            })
            await this.super.service.handleStateThree()(stateThree => {
              this.rc.setState({
                stateThree
              })
            })
          } else {
            window.alert('Production to be cancel')
          }
        }
      }
    }
  }
}

export const useMembraneStore = createStore(storeConfig)
export default React.createContext()
