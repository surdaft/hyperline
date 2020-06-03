import React from 'react'
import Component from 'hyper/component'
import { mem as memoryData } from 'systeminformation'
import leftPad from 'left-pad'
import SvgIcon from '../utils/svg-icon'

class PluginIcon extends Component {
  render() {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g className='memory-icon'>
            <g id="memory" transform="translate(1.000000, 1.000000)">
              <path d="M3,0 L11,0 L11,14 L3,14 L3,0 Z M4,1 L10,1 L10,13 L4,13 L4,1 Z" />
              <rect x="5" y="2" width="4" height="10" />
              <rect x="12" y="1" width="2" height="1" />
              <rect x="12" y="3" width="2" height="1" />
              <rect x="12" y="5" width="2" height="1" />
              <rect x="12" y="9" width="2" height="1" />
              <rect x="12" y="7" width="2" height="1" />
              <rect x="12" y="11" width="2" height="1" />
              <rect x="0" y="1" width="2" height="1" />
              <rect x="0" y="3" width="2" height="1" />
              <rect x="0" y="5" width="2" height="1" />
              <rect x="0" y="9" width="2" height="1" />
              <rect x="0" y="7" width="2" height="1" />
              <rect x="0" y="11" width="2" height="1" />
            </g>
          </g>
        </g>

        <style jsx>{`
          .memory-icon {
            fill: #fff;
          }
        `}</style>

      </SvgIcon>
    )
  }
}

export default class Memory extends Component {
  static displayName() {
    return 'memory'
  }

  constructor(props) {
    super(props)

    this.state = {
      activeMemory: 0,
      totalMemory: 0
    }

    this.getMemory = this.getMemory.bind(this)
    this.setMemory = this.setMemory.bind(this)
  }

  componentDidMount() {
    this.setMemory()
    this.interval = setInterval(() => this.setMemory(), 2500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getMemory() {
    return memoryData().then(memory => {
      let totalMb = this.getMb(memory.total);
      let convertTotalGb = (totalMb / 1024).toFixed(0);
      let convertTotalSubGb = (totalMb % 1024) / 1024;
      
      let activeMb = this.getMb(memory.active);
      let convertActiveGb = (activeMb / 1024).toFixed(0);
      let convertActiveSubGb = (activeMb % 1024) / 1024;
      
      const totalMemory = `${convertTotalGb}.${convertTotalSubGb}`
      const activeMemory = `${convertActiveGb}.${convertActiveSubGb}`

      return {
        activeMemory,
        totalMemory
      }
    })
  }

  setMemory() {
    return this.getMemory().then(data => this.setState(data))
  }

  getMb(bytes) {
    // 1024 * 1024 = 1048576
    return (bytes / 1048576).toFixed(0)
  }

  render() {
    return (
      <div className='wrapper'>
        <PluginIcon /> {this.state.activeMemory}GB / {this.state.totalMemory}GB

        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
