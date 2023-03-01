import React from "react"
import Archethic from "archethic"

const archethic = new Archethic("https://testnet.archethic.net")

export default class extends React.Component {
  constructor() {
    super()
    this.state = { connected: false}
  }

  async componentDidMount() {
    await archethic.connect()
    const { services: {uco}} = await archethic.network.getOracleData()
    const { usd: usdPrice } = uco

    this.setState(state => {
      state.connected = true
      state.usdPrice = usdPrice
      return state
    });
  }

  render() {
    return (
      <div>
        { !this.state.connected && <p>Connecting to Archethic...</p> }
        { this.state.connected && 
          <div>
            <p>Connected to Archethic</p>
            <p>UCO price: ${this.state.usdPrice}</p>
          </div>
        }
      </div>
    )
  }
}
